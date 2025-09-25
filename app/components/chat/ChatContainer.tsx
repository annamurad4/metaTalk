'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat, ChatMessage as ChatMessageType } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ScheduleModal from './ScheduleModal';
import { Video, Calendar, Loader2 } from 'lucide-react';

interface ChatContainerProps {
  token: string;
  userId: string;
  receiverId?: string;
  sessionId?: string;
  showSchedule?: boolean;
  showVideoCall?: boolean;
}

export default function ChatContainer({
  token,
  userId,
  receiverId,
  sessionId,
  showSchedule = true,
  showVideoCall = true,
}: ChatContainerProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Chat hook kullanımı
  const {
    isConnected,
    messages,
    session,
    error,
    isLoading,
    sendMessage,
    scheduleSession,
  } = useChat({
    token,
    receiverId,
    sessionId,
  });
  
  // Mesajlar güncellendiğinde otomatik kaydırma
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Mesaj gönderme işlemi
  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };
  
  // Oturum planlama işlemi
  const handleScheduleSession = (date: Date) => {
    scheduleSession(date.toISOString());
    setIsScheduleModalOpen(false);
  };
  
  // Görüntülü arama başlatma işlemi (şimdilik işlevsiz)
  const handleStartVideoCall = () => {
    alert('Görüntülü arama özelliği henüz aktif değil.');
  };
  
  // Karşı tarafın adını belirle
  const getReceiverName = () => {
    if (session) {
      // Oturum varsa, kullanıcının rolüne göre karşı tarafı belirle
      const isLearner = session.learner_id === userId;
      const otherUser = isLearner ? session.teacher : session.learner;
      return otherUser ? `${otherUser.name} ${otherUser.surname}` : 'Kullanıcı';
    } else if (messages.length > 0) {
      // Mesajlardan karşı tarafı belirle
      const otherMessage = messages.find(msg => msg.sender_id !== userId);
      if (otherMessage?.sender) {
        return `${otherMessage.sender.name} ${otherMessage.sender.surname}`;
      }
    }
    return 'Kullanıcı';
  };
  
  // Yükleniyor durumu
  if (isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500">Mesajlar yükleniyor...</p>
      </div>
    );
  }
  
  // Hata durumu
  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p className="text-red-500 mb-4">Hata: {error}</p>
        <Button onClick={() => window.location.reload()}>Yeniden Dene</Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Başlık */}
      <div className="bg-white border-b p-3 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">{getReceiverName()}</h2>
          <p className="text-xs text-gray-500">
            {isConnected ? 'Bağlı' : 'Bağlanıyor...'}
          </p>
        </div>
        
        <div className="flex space-x-2">
          {/* Görüşme planla butonu */}
          {showSchedule && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Görüşme Planla
            </Button>
          )}
          
          {/* Görüntülü arama butonu (işlevsiz) */}
          {showVideoCall && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartVideoCall}
              disabled={!session?.scheduled_at}
            >
              <Video className="w-4 h-4 mr-1" />
              Görüntülü Ara
            </Button>
          )}
        </div>
      </div>
      
      {/* Mesajlar */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center text-gray-500">
            <p>Henüz mesaj yok</p>
            <p className="text-sm">Bir mesaj göndererek sohbete başlayın</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message: ChatMessageType) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isOwn={message.sender_id === userId}
                senderName={message.sender?.name ? `${message.sender.name} ${message.sender.surname}` : undefined}
                senderAvatar={message.sender?.avatar_url}
                timestamp={message.created_at}
                isRead={message.read}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Mesaj giriş alanı */}
      <ChatInput
        onSend={handleSendMessage}
        onSchedule={() => setIsScheduleModalOpen(true)}
        disabled={!isConnected}
      />
      
      {/* Görüşme planlama modalı */}
      {showSchedule && (
        <ScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSchedule={handleScheduleSession}
          existingDate={session?.scheduled_at ? new Date(session.scheduled_at) : undefined}
        />
      )}
    </div>
  );
}
