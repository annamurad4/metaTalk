"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function SessionsLandingPage() {
  const router = useRouter();
  const [joinUrl, setJoinUrl] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Giriş durumunu kontrol et
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await response.json();
        
        if (!data.success || !data.data) {
          // Giriş yapmamışsa login sayfasına yönlendir
          router.push('/auth/login');
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleJoinByLink = () => {
    try {
      const url = new URL(joinUrl);
      const parts = url.pathname.split('/');
      const roomName = parts[parts.length - 1] || '';
      if (!roomName) throw new Error('Geçersiz oda linki');
      router.push(`/sessions/${roomName}`);
    } catch {
      setError('Geçerli bir Daily oda linki giriniz');
    }
  };

  const handleCreateRoom = async () => {
    try {
      setCreating(true);
      setError(null);
      const res = await fetch('/api/sessions/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxParticipants: 2, duration: 30 }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Oda oluşturulamadı');
      const roomName = data.data.room.name;
      console.log('Oda oluşturuldu:', data.data.room.url);
      alert(`Oda oluşturuldu: ${data.data.room.url}`);
      // Otomatik odaya gir
      router.push(`/sessions/${roomName}`);
    } catch (e: any) {
      setError(e.message || 'Oda oluşturulamadı');
    } finally {
      setCreating(false);
    }
  };

  // Loading durumu
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Giriş durumu kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Görüşme Oturumu</h1>
          <p className="text-gray-600">Test aşaması için iki seçenek:</p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">Ephemeral</Badge>
            <Badge variant="outline">Maks. 30 dakika</Badge>
            <Badge variant="outline">Daily.co</Badge>
          </div>
        </div>

        {/* Gelecek: Arama (eşleştirme) butonu */}
        <div className="opacity-60 pointer-events-none">
          <Button className="w-full" size="lg" disabled>
            Öğrenmeye Başla (Yakında)
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Not: Eşleştirme algoritması (müsait gün + dil eşleşmesi) eklendikten sonra aktif olacak.
          </p>
        </div>

        {/* Link ile katıl */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Oda linki ile katıl</label>
          <div className="flex gap-2">
            <Input
              value={joinUrl}
              onChange={(e) => setJoinUrl(e.target.value)}
              placeholder="https://metatalk.daily.co/oda-adi"
            />
            <Button onClick={handleJoinByLink}>
              Odaya Katıl
            </Button>
          </div>
        </div>

        {/* Oda oluştur */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Yeni oda oluştur</label>
          <Button onClick={handleCreateRoom} disabled={creating} variant="secondary" className="w-full">
            {creating ? 'Oluşturuluyor...' : 'Oda Oluştur'}
          </Button>
          <p className="text-xs text-gray-500">
            Oluşturulan oda linki konsola ve uyarı penceresine yazdırılır.
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}
      </Card>
    </div>
  );
}

