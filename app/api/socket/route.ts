/**
 * Socket.io API endpoint
 * WebSocket bağlantıları için API rotası
 */
import { NextRequest, NextResponse } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/db';

// Soket sunucusu için singleton instance
let io: SocketIOServer;

// CORS yapılandırması
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS isteği için CORS yanıtı
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// WebSocket bağlantısı için GET isteği
export async function GET(req: NextRequest) {
  try {
    // Soket sunucusu zaten başlatılmışsa, mevcut sunucuyu kullan
    if (io) {
      return NextResponse.json(
        { success: true, message: 'Socket.io sunucusu zaten çalışıyor' },
        { headers: corsHeaders }
      );
    }

    // Yeni bir soket sunucusu oluştur
    const responseInit = {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
      },
    };

    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    // Soket sunucusunu başlat
    io = new SocketIOServer({
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

    // Sunucu başlatıldı mesajı
    await writer.write(encoder.encode('Socket.io sunucusu başlatıldı'));
    
    return new NextResponse(responseStream.readable, responseInit);
  } catch (error) {
    console.error('Socket.io sunucusu başlatma hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Socket.io sunucusu başlatılamadı' },
      { status: 500, headers: corsHeaders }
    );
  }
}
