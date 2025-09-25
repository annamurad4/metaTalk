'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Avatar, 
  Badge, 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  Separator,
  Progress,
  Modal
} from '@/components/ui'
import { 
  ArrowLeft, 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Star, 
  MessageCircle, 
  Calendar,
  Award,
  Users,
  BookOpen,
  Languages,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  User,
  Plus,
  Trash2,
  Clock,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'
import AvailableDays from '../components/AvailableDays'

interface Language {
  id: string
  language_id: string
  language: string
  code: string
  level: string
  role: string
}

interface UserStats {
  total_sessions: number
  rating: number
  languages_learned: number
  languages_taught: number
  active_days: number
}

interface User {
  email: string
  name: string
  surname: string
  department: string
  class_year: number
  avatar_url: string
  password_set?: boolean
  created_at: string
  languages: Language[]
  stats: UserStats
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    surname: '',
    department: '',
    class_year: 0,
    avatar_url: '',
    created_at: '',
    languages: [],
    stats: {
      total_sessions: 0,
      rating: 0,
      languages_learned: 0,
      languages_taught: 0,
      active_days: 0
    }
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    surname: '',
    department: '',
    class_year: '',
  })
  
  // Dil yönetimi için state'ler
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('A1')
  const [selectedRole, setSelectedRole] = useState('learn')
  const [isAddingLanguage, setIsAddingLanguage] = useState(false)
  
  // Form değişiklik işleyicisi
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm({
      ...editForm,
      [name]: value
    })
  }
  
  // Profil güncelleme işlemi
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser({ ...user, ...data.data })
        setIsEditing(false)
      } else {
        console.error('Profil güncellenemedi')
      }
    } catch (error) {
      console.error('Güncelleme hatası:', error)
    } finally {
      setIsUpdating(false)
    }
  }
  
  // Dil ekleme işlemi
  const handleAddLanguage = async () => {
    if (!selectedLanguage) return
    
    setIsAddingLanguage(true)
    try {
      const response = await fetch('/api/user-languages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: selectedRole,
          items: [{ code: selectedLanguage, level: selectedLevel }]
        })
      })
      
      if (response.ok) {
        // Profil verilerini yeniden yükle
        await fetchProfileData()
        // Formu temizle
        setSelectedLanguage('')
        setSelectedLevel('A1')
        setSelectedRole('learn')
      }
    } catch (error) {
      console.error('Dil ekleme hatası:', error)
    } finally {
      setIsAddingLanguage(false)
    }
  }
  
  // Dil silme işlemi
  const handleRemoveLanguage = async (languageId: string) => {
    try {
      const response = await fetch(`/api/user-languages/${languageId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchProfileData()
      }
    } catch (error) {
      console.error('Dil silme hatası:', error)
    }
  }
  
  // Profil verilerini çekme fonksiyonu
  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile', { 
        credentials: 'include',
        // Cache'i devre dışı bırak, her zaman yeni verileri çekelim
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      })
      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
          setEditForm({
            name: data.user.name || '',
            surname: data.user.surname || '',
            department: data.user.department || '',
            class_year: data.user.class_year?.toString() || '',
          })
        }
      } else if (response.status === 401) {
        // Access yoksa refresh dene ve tekrar dene
        const rf = await fetch('/api/auth/refresh', { 
          method: 'POST', 
          credentials: 'include',
          cache: 'no-store'
        })
        if (rf.ok) {
          const r2 = await fetch('/api/profile', { 
            credentials: 'include',
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          })
          if (r2.ok) {
            const data2 = await r2.json()
            if (data2.user) {
              setUser(data2.user)
              setEditForm({
                name: data2.user.name || '',
                surname: data2.user.surname || '',
                department: data2.user.department || '',
                class_year: data2.user.class_year?.toString() || '',
              })
            }
          } else {
            console.error('Profil verilerini yüklemede hata:', r2.status)
            window.location.href = '/auth/login'
          }
        } else {
          console.error('Refresh işleminde hata:', rf.status)
          window.location.href = '/auth/login'
        }
      }
    } catch (error) {
      console.error('API error:', error)
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Önce giriş durumunu kontrol et
        const authResponse = await fetch('/api/auth/me', { credentials: 'include' })
        const authData = await authResponse.json()
        
        if (!authData.success || !authData.data) {
          console.log("Oturum bulunamadı, refresh token deneniyor...")
          // Refresh token ile deneyelim
          const refreshResponse = await fetch('/api/auth/refresh', { 
            method: 'POST', 
            credentials: 'include'
          })
          
          if (!refreshResponse.ok) {
            console.log("Refresh başarısız, login sayfasına yönlendiriliyor...")
            // Giriş yapmamışsa login sayfasına yönlendir
            window.location.href = '/auth/login'
            return
          }
          
          // Refresh başarılı ise tekrar auth kontrolü yapalım
          const newAuthResponse = await fetch('/api/auth/me', { credentials: 'include' })
          const newAuthData = await newAuthResponse.json()
          
          if (!newAuthData.success || !newAuthData.data) {
            console.log("Refresh sonrası auth kontrolü başarısız, login sayfasına yönlendiriliyor...")
            window.location.href = '/auth/login'
            return
          }
        }
        
        // Profil verilerini yükle
        await fetchProfileData()
        
        // Mevcut dilleri yükle
        const langResponse = await fetch('/api/languages')
        if (langResponse.ok) {
          const langData = await langResponse.json()
          setAvailableLanguages(langData.data || [])
        }
      } catch (error) {
        console.error('API error:', error)
        // Hata durumunda da login sayfasına yönlendir (manuel yönlendirme)
        window.location.href = '/auth/login'
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [router])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Profil yükleniyor...</p>
        </div>
      </div>
    )
  }
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Ana Sayfa</span>
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-gray-900">Profil</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Ayarlar
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Bildirimler
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/matching">
                  <Search className="h-4 w-4 mr-2" />
                  Eşleşme Bul
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Profile Header */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <div className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                        {user.name?.[0]}{user.surname?.[0]}
                      </div>
                    </Avatar>
                    <div className="text-white">
                      <h2 className="text-3xl font-bold">{user.name} {user.surname}</h2>
                      <p className="text-blue-100 text-lg">{user.email}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {user.department}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          <Calendar className="h-3 w-3 mr-1" />
                          {user.class_year}. Sınıf
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold">{user.stats.rating}</span>
                    </div>
                    <p className="text-blue-100">Ortalama Puan</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{user.stats.total_sessions}</div>
                    <div className="text-sm text-gray-600">Toplam Görüşme</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{user.stats.languages_learned}</div>
                    <div className="text-sm text-gray-600">Öğrenilen Dil</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{user.stats.languages_taught}</div>
                    <div className="text-sm text-gray-600">Öğretilen Dil</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{user.stats.active_days}</div>
                    <div className="text-sm text-gray-600">Gün Aktif</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                <TabsTrigger value="activity">Aktivite</TabsTrigger>
                <TabsTrigger value="settings">Ayarlar</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* About */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <User className="h-5 w-5" />
                          <span>Hakkında</span>
                        </CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            if (isEditing) {
                              setIsEditing(false)
                            } else {
                              setIsEditing(true)
                              setEditForm({
                                name: user.name || '',
                                surname: user.surname || '',
                                department: user.department || '',
                                class_year: user.class_year?.toString() || '',
                              })
                            }
                          }}
                        >
                          {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="name" className="text-sm font-medium text-gray-700">Ad</label>
                              <input 
                                type="text"
                                id="name"
                                name="name"
                                value={editForm.name}
                                onChange={handleFormChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="surname" className="text-sm font-medium text-gray-700">Soyad</label>
                              <input 
                                type="text"
                                id="surname"
                                name="surname"
                                value={editForm.surname}
                                onChange={handleFormChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="department" className="text-sm font-medium text-gray-700">Bölüm</label>
                            <input 
                              type="text"
                              id="department"
                              name="department"
                              value={editForm.department}
                              onChange={handleFormChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="class_year" className="text-sm font-medium text-gray-700">Sınıf</label>
                            <input 
                              type="number"
                              id="class_year"
                              name="class_year"
                              value={editForm.class_year}
                              onChange={handleFormChange}
                              min="1"
                              max="8"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsEditing(false)}
                            >
                              İptal
                            </Button>
                            <Button 
                              type="submit"
                              disabled={isUpdating}
                            >
                              {isUpdating ? (
                                <>
                                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent"></div>
                                  Güncelleniyor
                                </>
                              ) : (
                                <>
                                  <Save className="h-4 w-4 mr-2" />
                                  Profili Kaydet
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <GraduationCap className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{user.department || 'Belirtilmemiş'}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{user.class_year ? `${user.class_year}. Sınıf` : 'Belirtilmemiş'}</span>
                          </div>
                          <div className="mt-4">
                            <Button 
                              className="w-full"
                              onClick={() => setIsEditing(true)}
                            >
                              <Edit3 className="h-4 w-4 mr-2" />
                              Profili Güncelle
                            </Button>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Müsait Günler */}
                  <AvailableDays />

                  {/* Languages Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Languages className="h-5 w-5" />
                        <span>Diller</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Dil Ekleme Formu */}
                      <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <h3 className="text-sm font-medium mb-3">Yeni Dil Ekle</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Dil</label>
                            <select 
                              value={selectedLanguage}
                              onChange={(e) => setSelectedLanguage(e.target.value)}
                              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Dil seçin</option>
                              {availableLanguages.map((lang: any) => (
                                <option key={lang.code} value={lang.code}>
                                  {lang.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Seviye</label>
                            <select 
                              value={selectedLevel}
                              onChange={(e) => setSelectedLevel(e.target.value)}
                              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="A1">A1 - Başlangıç</option>
                              <option value="A2">A2 - Temel</option>
                              <option value="B1">B1 - Orta Alt</option>
                              <option value="B2">B2 - Orta Üst</option>
                              <option value="C1">C1 - İleri</option>
                              <option value="C2">C2 - Yeterlik</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Durum</label>
                            <select 
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value)}
                              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="learn">Öğrenmek İstiyorum</option>
                              <option value="teach">Öğretebilirim</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button 
                            onClick={handleAddLanguage}
                            disabled={!selectedLanguage || isAddingLanguage}
                            size="sm"
                          >
                            {isAddingLanguage ? (
                              <>
                                <div className="animate-spin mr-2 h-3 w-3 border-2 border-white rounded-full border-t-transparent"></div>
                                Ekleniyor
                              </>
                            ) : (
                              <>
                                <Plus className="h-3 w-3 mr-2" />
                                Dil Ekle
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Dil Listesi */}
                      <div className="mt-2">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Dil Listem</h3>
                        {user.languages && user.languages.length > 0 ? (
                          <div className="space-y-3">
                            {user.languages.map((lang, index) => (
                              <div key={lang.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900">{lang.language}</span>
                                    <Badge variant={lang.role === 'learn' ? 'default' : 'secondary'} className="text-xs">
                                      {lang.role === 'learn' ? 'Öğreniyor' : 'Öğretiyor'}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center space-x-3 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {lang.level}
                                    </Badge>
                                    <Progress 
                                      value={
                                        lang.level === 'A1' ? 20 : 
                                        lang.level === 'A2' ? 40 : 
                                        lang.level === 'B1' ? 60 : 
                                        lang.level === 'B2' ? 80 : 
                                        100
                                      } 
                                      className="w-24 h-1" 
                                    />
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveLanguage(lang.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 bg-gray-50 rounded-lg">
                            <Languages className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">Henüz dil eklenmemiş</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>


              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Aktivite Geçmişi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Aktivite geçmişi burada olacak...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Hesap Ayarları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PasswordStatus />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function PasswordStatus() {
  const [status, setStatus] = useState<'unknown' | 'set' | 'not_set'>('unknown')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' })
        if (res.ok) {
          const { user } = await res.json()
          setStatus(user && (user.password_set || !!user.password_hash) ? 'set' : 'not_set')
        } else {
          setStatus('unknown')
        }
      } catch {
        setStatus('unknown')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) return <p className="text-gray-600">Durum kontrol ediliyor...</p>
  if (status === 'set') return <p className="text-success-700">Parola tanımlı.</p>
  return (
    <div className="space-y-3">
      <p className="text-accent-700">Parolanız tanımlı değil. Güvenlik için belirleyin.</p>
      <Link href="/auth/set-password" className="inline-block">
        <Button variant="gradient">Parola Belirle</Button>
      </Link>
    </div>
  )
}


