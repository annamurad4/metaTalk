'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Check, CheckCheck } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  isOwn: boolean;
  senderName?: string;
  senderAvatar?: string;
  timestamp: string;
  isRead?: boolean;
}

export default function ChatMessage({
  content,
  isOwn,
  senderName,
  senderAvatar,
  timestamp,
  isRead = false,
}: ChatMessageProps) {
  const [showTime, setShowTime] = useState(false);
  
  // Zaman formatını ayarla
  const formattedTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: tr,
  });
  
  return (
    <div
      className={cn(
        'flex mb-4',
        isOwn ? 'justify-end' : 'justify-start'
      )}
    >
      {/* Karşı tarafın mesajlarında avatar göster */}
      {!isOwn && (
        <div className="flex-shrink-0 mr-2">
          <Avatar
            src={senderAvatar}
            alt={senderName || 'Kullanıcı'}
            fallback={(senderName?.[0] || 'K').toUpperCase()}
            className="w-8 h-8"
          />
        </div>
      )}
      
      <div className="max-w-[75%]">
        {/* Karşı tarafın mesajlarında isim göster */}
        {!isOwn && senderName && (
          <div className="text-xs text-gray-500 mb-1 ml-1">
            {senderName}
          </div>
        )}
        
        {/* Mesaj içeriği */}
        <div
          className={cn(
            'rounded-lg px-4 py-2 inline-block',
            isOwn
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          )}
          onClick={() => setShowTime(!showTime)}
        >
          {content}
        </div>
        
        {/* Zaman ve okundu bilgisi */}
        <div
          className={cn(
            'flex items-center text-xs text-gray-500 mt-1',
            isOwn ? 'justify-end' : 'justify-start'
          )}
        >
          {showTime && <span className="mr-1">{formattedTime}</span>}
          
          {isOwn && (
            <span className="ml-1">
              {isRead ? (
                <CheckCheck className="w-3 h-3 text-blue-500" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
