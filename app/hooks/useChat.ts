/**
 * Chat hook
 * Socket.io ile gerçek zamanlı mesajlaşma için React hook'u
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// Mesaj tipi
export interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  session_id?: string | null;
  read: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    id: string;
    name?: string;
    surname?: string;
    avatar_url?: string;
  };
  receiver?: {
    id: string;
    name?: string;
    surname?: string;
    avatar_url?: string;
  };
}

// Oturum tipi
export interface Session {
  id: string;
  learner_id: string;
  teacher_id: string;
  language_id: string;
  scheduled_at?: string | null;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  daily_room_url?: string | null;
  created_at: string;
  updated_at: string;
  learner?: {
    id: string;
    name?: string;
    surname?: string;
    avatar_url?: string;
    department?: string;
  };
  teacher?: {
    id: string;
    name?: string;
    surname?: string;
    avatar_url?: string;
    department?: string;
  };
  language?: {
    id: string;
    code: string;
    name: string;
  };
  messages?: ChatMessage[];
}

// Hook options
interface UseChatOptions {
  token: string;
  receiverId?: string;
  sessionId?: string;
}

/**
 * Chat hook
 */
export function useChat({ token, receiverId, sessionId }: UseChatOptions) {
  // State
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Socket ref
  const socketRef = useRef<Socket | null>(null);
  
  // Bağlantı kur
  useEffect(() => {
    if (!token) return;
    
    // Socket.io bağlantısını kur
    const socket = io({
      path: '/api/socket',
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    // Bağlantı olaylarını dinle
    socket.on('connect', () => {
      console.log('Socket.io bağlantısı kuruldu');
      setIsConnected(true);
      setError(null);
    });
    
    socket.on('disconnect', () => {
      console.log('Socket.io bağlantısı kesildi');
      setIsConnected(false);
    });
    
    socket.on('connect_error', (err) => {
      console.error('Socket.io bağlantı hatası:', err);
      setError('Bağlantı hatası: ' + err.message);
      setIsConnected(false);
    });
    
    // Mesaj olaylarını dinle
    socket.on('message_received', (message: ChatMessage) => {
      console.log('Yeni mesaj alındı:', message);
      setMessages((prev) => [message, ...prev]);
    });
    
    socket.on('message_sent', (message: ChatMessage) => {
      console.log('Mesaj gönderildi:', message);
      // Zaten mesaj gönderme işlevinde eklendiği için burada bir şey yapmaya gerek yok
    });
    
    socket.on('session_scheduled', (updatedSession: Session) => {
      console.log('Oturum planlandı:', updatedSession);
      setSession(updatedSession);
    });
    
    socket.on('error', (err: { message: string }) => {
      console.error('Socket.io hatası:', err);
      setError(err.message);
    });
    
    // Socket'i ref'e kaydet
    socketRef.current = socket;
    
    // Temizlik
    return () => {
      console.log('Socket.io bağlantısı kapatılıyor...');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);
  
  // Oturum ve mesajları yükle
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Belirli bir oturum varsa, oturum bilgilerini ve mesajlarını getir
        if (sessionId) {
          const sessionRes = await fetch(`/api/sessions/${sessionId}`);
          
          if (sessionRes.ok) {
            const sessionData = await sessionRes.json();
            if (sessionData.success) {
              setSession(sessionData.data);
              setMessages(sessionData.data.messages || []);
            }
          }
        }
        // Belirli bir alıcı varsa, mesajları getir
        else if (receiverId) {
          const messagesRes = await fetch(`/api/messages?userId=${receiverId}`);
          
          if (messagesRes.ok) {
            const messagesData = await messagesRes.json();
            if (messagesData.success) {
              setMessages(messagesData.data || []);
            }
          }
        }
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
        setError('Veriler yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token && (sessionId || receiverId)) {
      loadData();
    }
  }, [token, sessionId, receiverId]);
  
  // Mesaj gönder
  const sendMessage = useCallback((content: string) => {
    if (!socketRef.current || !isConnected) {
      setError('Bağlantı kurulamadı');
      return false;
    }
    
    if (!receiverId && !session) {
      setError('Alıcı belirtilmedi');
      return false;
    }
    
    try {
      // Mesajı socket üzerinden gönder
      socketRef.current.emit('send_message', {
        content,
        receiverId: receiverId || (session?.learner_id === socketRef.current.id ? session?.teacher_id : session?.learner_id),
        sessionId: sessionId || session?.id,
      });
      
      // Mesajı state'e ekle (optimistik UI güncellemesi)
      const newMessage: Partial<ChatMessage> = {
        id: `temp-${Date.now()}`, // Geçici ID
        content,
        sender_id: socketRef.current.id,
        receiver_id: receiverId || (session?.learner_id === socketRef.current.id ? session?.teacher_id : session?.learner_id),
        session_id: sessionId || session?.id,
        read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setMessages((prev) => [newMessage as ChatMessage, ...prev]);
      return true;
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      setError('Mesaj gönderilemedi');
      return false;
    }
  }, [isConnected, receiverId, session, sessionId]);
  
  // Oturum planla
  const scheduleSession = useCallback((scheduledAt: string) => {
    if (!socketRef.current || !isConnected) {
      setError('Bağlantı kurulamadı');
      return false;
    }
    
    if (!sessionId && !session?.id) {
      setError('Oturum belirtilmedi');
      return false;
    }
    
    try {
      // Oturum planlama isteğini socket üzerinden gönder
      socketRef.current.emit('schedule_session', {
        sessionId: sessionId || session?.id,
        scheduledAt,
      });
      
      return true;
    } catch (error) {
      console.error('Oturum planlama hatası:', error);
      setError('Oturum planlanamadı');
      return false;
    }
  }, [isConnected, session, sessionId]);
  
  // Mesajı okundu olarak işaretle
  const markAsRead = useCallback((messageId: string) => {
    if (!socketRef.current || !isConnected) {
      return false;
    }
    
    try {
      // Mesajı okundu olarak işaretle
      socketRef.current.emit('mark_as_read', { messageId });
      
      // Mesaj listesini güncelle
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
      
      return true;
    } catch (error) {
      console.error('Mesaj işaretleme hatası:', error);
      return false;
    }
  }, [isConnected]);
  
  // Tüm mesajları okundu olarak işaretle
  const markAllAsRead = useCallback(() => {
    if (!socketRef.current || !isConnected) {
      return false;
    }
    
    try {
      // Okunmamış mesajları bul
      const unreadMessages = messages.filter((msg) => !msg.read && msg.receiver_id === socketRef.current?.id);
      
      // Her bir mesajı okundu olarak işaretle
      unreadMessages.forEach((msg) => {
        socketRef.current?.emit('mark_as_read', { messageId: msg.id });
      });
      
      // Mesaj listesini güncelle
      setMessages((prev) => 
        prev.map((msg) => 
          msg.receiver_id === socketRef.current?.id ? { ...msg, read: true } : msg
        )
      );
      
      return true;
    } catch (error) {
      console.error('Mesajları işaretleme hatası:', error);
      return false;
    }
  }, [isConnected, messages]);
  
  return {
    isConnected,
    messages,
    session,
    error,
    isLoading,
    sendMessage,
    scheduleSession,
    markAsRead,
    markAllAsRead,
  };
}
