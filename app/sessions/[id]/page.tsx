'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { VideoCall } from '@/components/daily/video-call';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface SessionData {
  room: {
    id: string;
    name: string;
    url: string;
  };
  meetingToken: string;
  expiresAt: string;
}

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [callStarted, setCallStarted] = useState(false);

  // Session verilerini yükle
  useEffect(() => {
    const loadSession = async () => {
      try {
        setIsLoading(true);
        
        // Session ID'ye göre oda bilgilerini getir
        const response = await fetch(`/api/sessions/join-room`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomName: sessionId,
            duration: 30, // 30 dakika (ephemeral room)
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Session yüklenemedi');
        }

        // Güvenli tarih parse
        const safe = data.data as SessionData;
        if (safe.expiresAt && isNaN(Date.parse(safe.expiresAt))) {
          console.warn('Invalid expiresAt received, ignoring:', safe.expiresAt);
          safe.expiresAt = new Date(Date.now() + 30 * 60_000).toISOString();
        }

        setSessionData(safe);
      } catch (err) {
        console.error('Session load failed:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      loadSession();
    }
  }, [sessionId]);

  const handleCallStart = () => {
    setCallStarted(true);
  };

  const handleCallEnd = () => {
    setCallStarted(false);
    // Ana sayfaya yönlendir
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 w-full max-w-md">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 w-full max-w-md text-center">
          <div className="text-red-600 mb-4">
            <h2 className="text-xl font-semibold mb-2">Görüşme Hatası</h2>
            <p className="text-sm">{error}</p>
          </div>
          <Button onClick={() => router.push('/')}>
            Ana Sayfaya Dön
          </Button>
        </Card>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">Session Bulunamadı</h2>
          <Button onClick={() => router.push('/')}>
            Ana Sayfaya Dön
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!callStarted ? (
        // Pre-call ekranı
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="p-8 w-full max-w-md text-center">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Video Görüşme</h1>
              <p className="text-gray-600 mb-4">
                Görüşmeye katılmaya hazır mısınız?
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <Badge variant="outline">Maksimum 30 dakika</Badge>
                  <Badge variant="outline">2 kişi</Badge>
                  <Badge variant="secondary">Ephemeral</Badge>
                </div>
                <p>Oda: {sessionData.room.name}</p>
                <p>Bitiş: {new Date(sessionData.expiresAt).toLocaleString('tr-TR')}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleCallStart}
                className="w-full"
                size="lg"
              >
                Görüşmeye Katıl
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => router.push('/')}
                className="w-full"
              >
                İptal
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        // Video görüşme ekranı
        <div className="h-screen">
          <VideoCall
            roomUrl={sessionData.room.url}
            meetingToken={sessionData.meetingToken}
            onCallStart={handleCallStart}
            onCallEnd={handleCallEnd}
            maxDuration={30}
          />
        </div>
      )}
    </div>
  );
}

