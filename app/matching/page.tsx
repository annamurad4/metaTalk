"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Button } from '@/components/ui';
import { BookOpen, GraduationCap, Coins, Users, Clock, Star } from 'lucide-react';
import { Header } from '@/components/layout/header';

export default function MatchingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'learn' | 'teach' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [credits, setCredits] = useState(10);

  // Giriş durumunu ve kredileri kontrol et
  useEffect(() => {
    // Kredi bilgilerini yükle
    const loadCredits = async () => {
      try {
        const response = await fetch('/api/credits');
        const data = await response.json();
        
        if (data.success && data.data) {
          setCredits(data.data.credits);
        }
      } catch (error) {
        console.error('Kredi bilgileri yüklenirken hata:', error);
      }
    };
    
    if (isAuthenticated) {
      loadCredits();
    }
  }, [isAuthenticated]);

  // Giriş durumunu kontrol et
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await response.json();
        
        if (data.success && data.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Giriş yapmamışsa login sayfasına yönlendir
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        router.push('/auth/login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleMatching = async (type: 'learn' | 'teach') => {
    setIsLoading(true);
    setLoadingType(type);
    
    // Simüle edilmiş yükleme süresi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Eşleştirme sonuçları sayfasına yönlendir
    router.push(`/matching/results?type=${type}`);
  };

  // Loading durumu
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Giriş durumu kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  // Giriş yapmamışsa hiçbir şey gösterme (zaten yönlendirildi)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      {/* Ana Container */}
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dil Pratiği Eşleştirmesi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Medipol öğrencileriyle dil pratiği yapın. 
            Öğrenmek istediğiniz dilleri öğrenin, bildiğiniz dilleri öğretin!
          </p>
        </div>

        {/* Ana Eşleştirme Alanı */}
        <div className="relative max-w-6xl mx-auto">
          {/* Diagonal Çizgi Container */}
          <div className="relative h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Diagonal Çizgi */}
            <div className="absolute inset-0">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="diagonalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,0 L100,100 L100,0 Z" 
                  fill="url(#diagonalGradient)"
                />
                <line 
                  x1="0" 
                  y1="0" 
                  x2="100" 
                  y2="100" 
                  stroke="url(#diagonalGradient)" 
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>

            {/* Sol Taraf - Öğrenme */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-center space-y-6">
                  {/* İkon */}
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Başlık */}
                  <h2 className="text-3xl font-bold text-blue-900">
                    Yeni Dil Öğren
                  </h2>
                  
                  {/* Açıklama */}
                  <p className="text-blue-700 text-lg max-w-sm">
                    Yeni diller öğrenmek için eşleşme bulun. Her görüşme 1 kredi harcar.
                  </p>
                  
                  {/* Kredi Bilgisi */}
                  <div className="bg-blue-200 rounded-lg p-4 max-w-sm">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Coins className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Kredileriniz: {credits}</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Her öğrenme görüşmesi 1 kredi harcar. Kredi kazanmak için öğretme yapın.
                    </p>
                  </div>
                  
                  {/* Buton */}
                  <Button
                    onClick={() => handleMatching('learn')}
                    disabled={isLoading}
                    className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading && loadingType === 'learn' ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Eşleştirme Aranıyor...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5" />
                        <span>Öğrenmeye Başla</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* Sağ Taraf - Öğretme */}
              <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-gradient-to-br from-purple-50 to-pink-100">
                <div className="text-center space-y-6">
                  {/* İkon */}
                  <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Başlık */}
                  <h2 className="text-3xl font-bold text-purple-900">
                    Dil Öğret
                  </h2>
                  
                  {/* Açıklama */}
                  <p className="text-purple-700 text-lg max-w-sm">
                    Bildiğiniz dilleri öğretin ve kredi kazanın. Her öğretme 1 kredi kazandırır.
                  </p>
                  
                  {/* Kredi Bilgisi */}
                  <div className="bg-purple-200 rounded-lg p-4 max-w-sm">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Coins className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Kredileriniz: {credits}</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Her öğretme görüşmesi 1 kredi kazandırır. Öğretince krediniz artar.
                    </p>
                  </div>
                  
                  {/* Buton */}
                  <Button
                    onClick={() => handleMatching('teach')}
                    disabled={isLoading}
                    className="w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading && loadingType === 'teach' ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Eşleştirme Aranıyor...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-5 h-5" />
                        <span>Öğretmeye Başla</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Güvenli Eşleştirme
              </h3>
              <p className="text-gray-600">
                Sadece Medipol öğrencileriyle eşleşin. Güvenli ve kontrollü ortamda dil pratiği yapın.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Esnek Zamanlama
              </h3>
              <p className="text-gray-600">
                Müsait olduğunuz günlere göre otomatik eşleştirme yapılır. Kendi programınıza uygun görüşme ayarlayın.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kaliteli Deneyim
              </h3>
              <p className="text-gray-600">
                Ortak müsait günlere ve dil tercihlerine göre en uygun eşleştirmeler.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
