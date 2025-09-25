'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatContainer from '@/components/chat/ChatContainer';
import ChatFallback from '@/components/chat/ChatFallback';
import { Skeleton } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

interface SessionChatPageProps {
  params: {
    id: string;
  };
}

export default function SessionChatPage({ params }: SessionChatPageProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // URL parametresini kontrol et
  useEffect(() => {
    // Eğer ID parametresi boş veya 'undefined' ise geri yönlendir
    if (!params.id || params.id === 'undefined') {
      router.push('/profile');
      return;
    }
    
    // Test kullanıcısı için özel kontrol
    if (params.id === '' || params.id.length < 5) {
      router.push('/profile');
      return;
    }
  }, [params.id, router]);

  // Kullanıcı bilgilerini ve token'ı al
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Kullanıcı bilgilerini getir
        const userRes = await fetch('/api/auth/me');
        const userData = await userRes.json();
        
        if (!userData.success || !userData.data) {
          setError('Oturum bilgileri alınamadı');
          router.push('/auth/login');
          return;
        }
        
        // Kullanıcı ID'sini ayarla
        setUserId(userData.data.id);
        
        // Token'ı al
        const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='))
          ?.split('=')[1];
        
        if (!accessToken) {
          setError('Yetkilendirme token\'ı bulunamadı');
          router.push('/auth/login');
          return;
        }
        
        setToken(accessToken);
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
        setError('Kullanıcı bilgileri alınamadı');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [router]);
  
  // Yükleniyor durumu
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex items-center mb-6">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-20 h-4 mt-1" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
          <div className="border-b p-4">
            <Skeleton className="w-40 h-6" />
          </div>
          
          <div className="p-4 space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <Skeleton className={`w-64 h-12 rounded-lg ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Hata durumu
  if (error || !userId || !token) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <ChatFallback 
          title="Mesajlaşma Başlatılamadı" 
          message={error || 'Oturum bilgileri alınamadı. Lütfen tekrar giriş yapın.'}
          backUrl="/profile"
          backText="Profile Dön"
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Geri butonu */}
      <button
        onClick={() => router.push('/profile')}
        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Profile Dön
      </button>
      
      {/* Chat container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
        <ChatContainer
          token={token}
          userId={userId}
          sessionId={params.id}
          showSchedule={true}
          showVideoCall={true}
        />
      </div>
    </div>
  );
}
