'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface ChatFallbackProps {
  title?: string;
  message?: string;
  backUrl?: string;
  backText?: string;
}

export default function ChatFallback({
  title = 'Mesajlaşma Başlatılamadı',
  message = 'Mesajlaşma başlatılırken bir sorun oluştu. Lütfen tekrar deneyin.',
  backUrl = '/matching/results?type=learn',
  backText = 'Eşleşmelere Dön',
}: ChatFallbackProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[500px] p-6 bg-white rounded-lg shadow-md">
      <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}
      </p>
      
      <Button
        onClick={() => router.push(backUrl)}
        className="inline-flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {backText}
      </Button>
    </div>
  );
}
