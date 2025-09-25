/**
 * WebSocket sunucu yapılandırması
 * Socket.io ile gerçek zamanlı mesajlaşma için sunucu tarafı konfigürasyonu
 */
import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Soket sunucusu için tip tanımı
interface SocketServer extends SocketIOServer {
  io?: SocketIOServer;
}

// Soket sunucusu için singleton instance
let io: SocketServer;

// Soket sunucusunu başlat
export const initSocketServer = (req: NextApiRequest, res: NextApiResponse) => {
  if (!io) {
    console.log('Socket.io sunucusu başlatılıyor...');
    
    // HTTP sunucusunu al
    const httpServer: NetServer = (res.socket as any).server;
    
    // Socket.io sunucusunu oluştur
    io = new SocketIOServer(httpServer, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    // Kimlik doğrulama middleware'i
    io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error('Kimlik doğrulama hatası: Token bulunamadı'));
        }

        const payload = await verifyAccessToken(token);
        if (!payload?.sub) {
          return next(new Error('Kimlik doğrulama hatası: Geçersiz token'));
        }

        // Kullanıcı ID'sini soket nesnesine ekle
        socket.data.userId = payload.sub;
        next();
      } catch (error) {
        console.error('Soket kimlik doğrulama hatası:', error);
        next(new Error('Kimlik doğrulama hatası'));
      }
    });

    // Bağlantı olaylarını dinle
    io.on('connection', async (socket) => {
      const userId = socket.data.userId;
      console.log(`Kullanıcı bağlandı: ${userId}`);
      
      // Kullanıcıyı kendi odasına ekle (özel mesajlar için)
      socket.join(userId);
      
      // Mesaj gönderme
      socket.on('send_message', async (data) => {
        try {
          const { content, receiverId, sessionId } = data;
          
          if (!content || !receiverId) {
            socket.emit('error', { message: 'Geçersiz mesaj formatı' });
            return;
          }
          
          // Mesajı veritabanına kaydet
          const message = await prisma.chatMessage.create({
            data: {
              content,
              sender_id: userId,
              receiver_id: receiverId,
              session_id: sessionId || null,
            },
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  avatar_url: true,
                },
              },
            },
          });
          
          // Mesajı gönderene ilet (kendi arayüzünde göstermek için)
          socket.emit('message_sent', message);
          
          // Mesajı alıcıya ilet (eğer bağlıysa)
          io.to(receiverId).emit('message_received', message);
          
          console.log(`Mesaj gönderildi: ${userId} -> ${receiverId}`);
        } catch (error) {
          console.error('Mesaj gönderme hatası:', error);
          socket.emit('error', { message: 'Mesaj gönderilemedi' });
        }
      });
      
      // Oturum planlama
      socket.on('schedule_session', async (data) => {
        try {
          const { sessionId, scheduledAt } = data;
          
          if (!sessionId || !scheduledAt) {
            socket.emit('error', { message: 'Geçersiz oturum bilgileri' });
            return;
          }
          
          // Oturumu güncelle
          const session = await prisma.session.update({
            where: { id: sessionId },
            data: {
              scheduled_at: new Date(scheduledAt),
              status: 'scheduled',
            },
            include: {
              learner: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                },
              },
              teacher: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                },
              },
              language: true,
            },
          });
          
          // Her iki kullanıcıya da bildirim gönder
          io.to(session.learner_id).emit('session_scheduled', session);
          io.to(session.teacher_id).emit('session_scheduled', session);
          
          console.log(`Oturum planlandı: ${sessionId}, ${scheduledAt}`);
        } catch (error) {
          console.error('Oturum planlama hatası:', error);
          socket.emit('error', { message: 'Oturum planlanamadı' });
        }
      });
      
      // Mesaj okundu işaretleme
      socket.on('mark_as_read', async (data) => {
        try {
          const { messageId } = data;
          
          if (!messageId) {
            socket.emit('error', { message: 'Geçersiz mesaj ID' });
            return;
          }
          
          // Mesajı güncelle
          await prisma.chatMessage.update({
            where: { id: messageId },
            data: { read: true },
          });
          
          console.log(`Mesaj okundu olarak işaretlendi: ${messageId}`);
        } catch (error) {
          console.error('Mesaj işaretleme hatası:', error);
          socket.emit('error', { message: 'Mesaj işaretlenemedi' });
        }
      });
      
      // Bağlantı koptuğunda
      socket.on('disconnect', () => {
        console.log(`Kullanıcı bağlantısı kesildi: ${userId}`);
      });
    });
    
    // Socket.io sunucusunu HTTP sunucusuna bağla
    (res.socket as any).server.io = io;
  }
  
  res.end();
};

// Socket.io sunucusunu getir
export const getSocketServer = () => {
  return io;
};
