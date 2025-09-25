'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Calendar } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onSchedule?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  onSchedule,
  disabled = false,
  placeholder = 'Mesajınızı yazın...',
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Mesaj gönder
  const handleSend = () => {
    if (!message.trim() || disabled) return;
    
    onSend(message.trim());
    setMessage('');
    
    // Textarea'ya odaklan
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Enter tuşu ile gönder (Shift+Enter ile yeni satır)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="border-t p-3 bg-white">
      <div className="flex items-end space-x-2">
        {/* Mesaj yazma alanı */}
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[60px] resize-none"
            maxLength={1000}
          />
        </div>
        
        <div className="flex space-x-2">
          {/* Randevu planlama butonu */}
          {onSchedule && (
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={onSchedule}
              disabled={disabled}
              title="Görüşme Planla"
            >
              <Calendar className="h-5 w-5" />
            </Button>
          )}
          
          {/* Gönder butonu */}
          <Button
            type="button"
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            title="Gönder"
          >
            <Send className="h-5 w-5 mr-1" />
            <span>Gönder</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
