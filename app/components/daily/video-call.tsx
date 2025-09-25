'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VideoCallProps {
  roomUrl: string;
  meetingToken?: string;
  onCallEnd?: () => void;
  onCallStart?: () => void;
  maxDuration?: number; // dakika cinsinden (default: 30)
}

interface CallState {
  isConnected: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  participants: number;
  duration: number; // saniye cinsinden
}

export function VideoCall({
  roomUrl,
  meetingToken,
  onCallEnd,
  onCallStart,
  maxDuration = 30, // 30 dakika (ephemeral room)
}: VideoCallProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [callState, setCallState] = useState<CallState>({
    isConnected: false,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    participants: 0,
    duration: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Süre sayacı
  useEffect(() => {
    if (callState.isConnected) {
      durationIntervalRef.current = setInterval(() => {
        setCallState(prev => {
          const newDuration = prev.duration + 1;
          
          // Maksimum süre kontrolü
          if (newDuration >= maxDuration * 60) {
            handleCallEnd();
            return prev;
          }
          
          return { ...prev, duration: newDuration };
        });
      }, 1000);
    } else {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, [callState.isConnected, maxDuration]);

  // Daily.co iframe yükleme
  useEffect(() => {
    if (!roomUrl) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    // Daily.co iframe URL'ini oluştur
    const dailyUrl = new URL(roomUrl);
    if (meetingToken) {
      dailyUrl.searchParams.set('t', meetingToken);
    }

    // Iframe yüklenince loading'i kapat
    iframe.onload = () => {
      setIsLoading(false);
      setCallState(prev => ({ ...prev, isConnected: true }));
      onCallStart?.();
    };

    iframe.src = dailyUrl.toString();

    return () => {
      // cleanup
    };
  }, [roomUrl, meetingToken, onCallStart, onCallEnd]);

  const handleCallEnd = () => {
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
    }
    setCallState(prev => ({ ...prev, isConnected: false }));
    onCallEnd?.();
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = (): string => {
    const remaining = (maxDuration * 60) - callState.duration;
    return formatDuration(Math.max(0, remaining));
  };

  if (error) {
    return (
      <Card className="p-6 text-center">
        <div className="text-red-600 mb-4">
          <h3 className="text-lg font-semibold">Görüşme Hatası</h3>
          <p className="text-sm">{error}</p>
        </div>
        <Button onClick={() => window.location.reload()}>
          Tekrar Dene
        </Button>
      </Card>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Görüşme Kontrolleri */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant={callState.isConnected ? 'default' : 'secondary'}>
            {callState.isConnected ? 'Bağlı' : 'Bağlanıyor...'}
          </Badge>
          <span className="text-sm text-gray-600">
            Katılımcı: {callState.participants}
          </span>
          <span className="text-sm text-gray-600">
            Süre: {formatDuration(callState.duration)}
          </span>
          <span className="text-sm text-orange-600">
            Kalan: {getRemainingTime()}
          </span>
        </div>
        
        <Button
          variant="destructive"
          onClick={handleCallEnd}
          disabled={!callState.isConnected}
        >
          Görüşmeyi Bitir
        </Button>
      </div>

      {/* Video Iframe */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Görüşme yükleniyor...</p>
            </div>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          allow="camera; microphone; display-capture; screen-wake-lock"
          title="Video Görüşme"
        />
      </div>

      {/* Alt Bilgi */}
      <div className="bg-gray-50 p-3 text-xs text-gray-500 text-center">
        Ephemeral oda: Maksimum {maxDuration} dakika sürebilir. 
        Kalan süre: {getRemainingTime()}
      </div>
    </div>
  );
}

