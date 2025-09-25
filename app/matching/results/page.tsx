"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  MessageCircle, 
  Clock,
  BookOpen,
  GraduationCap,
  Coins,
  Filter,
  Search
} from 'lucide-react';

interface MatchUser {
  id: string;
  name: string;
  surname: string;
  avatar_url?: string;
  department: string;
  average_rating: number;
}

interface MatchResult {
  id: string;
  teacher?: MatchUser;
  learner?: MatchUser;
  language: {
    id: string;
    name: string;
    code: string;
  };
  commonDays: number[];
  commonDayCount: number;
  score: number;
  isMutual: boolean;
}

export default function MatchingResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type') as 'learn' | 'teach';
  
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredMatches, setFilteredMatches] = useState<MatchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'rating'>('score');
  const [user, setUser] = useState<{ credits: number } | null>(null);

  // Gün isimleri
  const dayNames = ['', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  useEffect(() => {
    fetchMatches();
    fetchUserCredits();
  }, [type]);

  useEffect(() => {
    filterAndSortMatches();
  }, [matches, searchTerm, sortBy]);

  const fetchUserCredits = async () => {
    try {
      const response = await fetch('/api/credits');
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data);
      }
    } catch (error) {
      console.error('Kredi bilgileri yüklenirken hata:', error);
    }
  };

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const endpoint = type === 'learn' ? '/api/matches/learning' : '/api/matches/teaching';
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data.success) {
        console.log(`Eşleştirme sonuçları (${type}):", `, data.data);
        setMatches(data.data || []);
      } else {
        console.error('Eşleştirme hatası:', data.error);
      }
    } catch (error) {
      console.error('API hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMatches = () => {
    if (!matches || matches.length === 0) {
      setFilteredMatches([]);
      return;
    }
    
    let filtered = [...matches];

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(match => {
        const user = type === 'learn' ? match.teacher : match.learner;
        const fullName = `${user?.name} ${user?.surname}`.toLowerCase();
        const department = user?.department?.toLowerCase() || '';
        const language = match.language.name.toLowerCase();
        
        return fullName.includes(searchTerm.toLowerCase()) ||
               department.includes(searchTerm.toLowerCase()) ||
               language.includes(searchTerm.toLowerCase());
      });
    }

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'name':
          const nameA = type === 'learn' ? a.teacher?.name : a.learner?.name;
          const nameB = type === 'learn' ? b.teacher?.name : b.learner?.name;
          return (nameA || '').localeCompare(nameB || '');
        case 'rating':
          const ratingA = type === 'learn' ? a.teacher?.average_rating : a.learner?.average_rating;
          const ratingB = type === 'learn' ? b.teacher?.average_rating : b.learner?.average_rating;
          return (ratingB || 0) - (ratingA || 0);
        default:
          return 0;
      }
    });

    setFilteredMatches(filtered);
  };

  const handleStartSession = (matchId: string) => {
    // Oturum başlatma işlemi
    console.log('Oturum başlatılıyor:', matchId);
    // TODO: Oturum başlatma API'si entegrasyonu
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Eşleştirmeler Aranıyor...
          </h2>
          <p className="text-gray-500">
            Size en uygun {type === 'learn' ? 'öğretmenleri' : 'öğrencileri'} buluyoruz
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Geri</span>
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {type === 'learn' ? 'Öğrenme Eşleştirmeleri' : 'Öğretme Eşleştirmeleri'}
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredMatches.length} eşleştirme bulundu
              </p>
            </div>
          </div>

          {/* Kredi Bilgisi */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-gray-700">
                  Kredileriniz: {user?.credits ?? 10}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Öğretme: +1 kredi | Öğrenme: -1 kredi
              </div>
            </div>
          </div>
        </div>

        {/* Filtreler ve Arama */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Arama */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="İsim, bölüm veya dil ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sıralama */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'score' | 'name' | 'rating')}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="score">Puana Göre</option>
                  <option value="name">İsme Göre</option>
                  <option value="rating">Değerlendirmeye Göre</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eşleştirme Listesi */}
        {filteredMatches.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Eşleştirme Bulunamadı
              </h3>
              <p className="text-gray-500 mb-6">
                Arama kriterlerinize uygun {type === 'learn' ? 'öğretmen' : 'öğrenci'} bulunamadı.
              </p>
              <Button onClick={() => router.push('/matching')}>
                Yeni Arama Yap
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => {
              const user = type === 'learn' ? match.teacher : match.learner;
              const isTeacher = type === 'learn';
              
              return (
                <Card key={match.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user?.name?.[0]}{user?.surname?.[0]}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {user?.name} {user?.surname}
                          </CardTitle>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {user?.department}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{user?.average_rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          %{Math.round(match.score * 10)} Uyum
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Dil Bilgisi */}
                    <div className="flex items-center space-x-2">
                      {isTeacher ? (
                        <GraduationCap className="w-5 h-5 text-purple-500" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-blue-500" />
                      )}
                      <span className="font-medium">{match.language.name}</span>
                      {match.isMutual && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Karşılıklı
                        </Badge>
                      )}
                    </div>

                    {/* Ortak Günler */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Ortak Müsait Günler ({match.commonDayCount})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {match.commonDays.map((day) => (
                          <Badge key={day} variant="outline" className="text-xs">
                            {dayNames[day]}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Aksiyon Butonları */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        asChild
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Link href={`/chat/${isTeacher ? match.learner?.id : match.teacher?.id || ''}`} onClick={(e) => {
                          // Test kullanıcıları için özel kontrol
                          const targetId = isTeacher ? match.learner?.id : match.teacher?.id;
                          if (!targetId) {
                            e.preventDefault();
                            alert('Bu test kullanıcısıyla mesajlaşma şu an aktif değil.');
                          }
                        }}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Mesaj Gönder
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Clock className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
