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
  Input,
  Separator,
  Modal,
  ModalContent,
  ModalHeader, 
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui'
import { 
  ArrowLeft, 
  Settings, 
  Bell, 
  Search,
  Star, 
  MessageCircle, 
  Calendar,
  Award,
  Users,
  BookOpen,
  Languages,
  GraduationCap,
  Edit3,
  Save,
  X,
  User,
  Plus,
  Trash2,
  Coins,
  Target,
  TrendingUp,
  Clock,
  Globe,
  Shield,
  Heart,
  Camera,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import AvailableDays from '@/components/AvailableDays'
import AvatarUpload from '@/components/AvatarUpload'

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
}

interface User {
  id: string
  email: string
  name: string | null
  surname: string | null
  department: string | null
  class_year: number | null
  avatar_url: string | null
  password_set: boolean
  credits: number
  created_at: string
  updated_at: string
  languages: Language[]
  available_days: number[]
  stats: UserStats
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    surname: '',
    department: '',
    class_year: ''
  })
  
  // Language management states
  const [showAddLanguage, setShowAddLanguage] = useState(false)
  const [availableLanguages, setAvailableLanguages] = useState<{code: string, name: string}[]>([])
  const [newLanguage, setNewLanguage] = useState({
    code: '',
    level: 'A1' as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2',
    role: 'learn' as 'learn' | 'teach'
  })
  const [isAddingLanguage, setIsAddingLanguage] = useState(false)
  
  useEffect(() => {
    fetchProfile()
    fetchAvailableLanguages()
  }, [])

  const fetchAvailableLanguages = async () => {
    try {
      const response = await fetch('/api/languages')
      const data = await response.json()
      if (data.success) {
        setAvailableLanguages(data.data)
      }
    } catch (error) {
      console.error('Diller yüklenirken hata:', error)
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      const data = await response.json()
      
      if (data.success && data.user) {
        setUser(data.user)
      } else {
        router.push('/auth/login')
      }
    } catch (error) {
      console.error('Profil yüklenirken hata:', error)
      router.push('/auth/login')
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const updateData = {
        name: editForm.name,
        surname: editForm.surname,
        department: editForm.department,
        class_year: editForm.class_year ? parseInt(editForm.class_year) : null
      }

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        setIsEditing(false)
        fetchProfile() // Profili yeniden yükle
      }
    } catch (error) {
      console.error('Profil güncellenirken hata:', error)
    }
  }
  
  // Avatar güncellemesi
  const handleAvatarUpdate = (url: string) => {
    if (user) {
      // UI'ı hemen güncelle
      setUser({
        ...user,
        avatar_url: url
      });
    }
  }

  const handleAddLanguage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLanguage.code) return
    
    setIsAddingLanguage(true)
    try {
      // Mevcut dilleri al ve yeni dili ekle
      const currentLanguages = user?.languages || []
      const existingLanguages = currentLanguages.filter(lang => lang.role === newLanguage.role)
      
      const updatedLanguages = [
        ...existingLanguages.map(lang => ({ code: lang.code, level: lang.level })),
        { code: newLanguage.code, level: newLanguage.level }
      ]

      const response = await fetch('/api/user-languages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: newLanguage.role,
          items: updatedLanguages
        })
      })
      
      if (response.ok) {
        setShowAddLanguage(false)
        setNewLanguage({ code: '', level: 'A1', role: 'learn' })
        fetchProfile() // Profili yeniden yükle
      }
    } catch (error) {
      console.error('Dil eklenirken hata:', error)
    } finally {
      setIsAddingLanguage(false)
    }
  }
  
  const handleRemoveLanguage = async (languageId: string) => {
    try {
      const response = await fetch(`/api/user-languages/${languageId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchProfile() // Profili yeniden yükle
      }
    } catch (error) {
      console.error('Dil kaldırılırken hata:', error)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Profil yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50"
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
              <h1 className="text-xl font-semibold text-gray-900">Profilim</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/matching">
                  <Search className="h-4 w-4 mr-2" />
                  Eşleşme Bul
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Bildirimler
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Ayarlar
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
          {/* Profile Header - Modern Design */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Avatar Section */}
                  <div className="relative">
                    {/* Avatar Yükleme Bileşeni */}
                    <AvatarUpload 
                      currentAvatarUrl={user.avatar_url || undefined}
                      onUpload={handleAvatarUpdate}
                      className="relative z-10"
                    />
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 text-center lg:text-left text-white">
                    <div className="mb-6">
                      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        {user.name} {user.surname}
                      </h1>
                      <p className="text-blue-100 text-xl mb-4">{user.email}</p>
                      
                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                        {user.department && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
                            <GraduationCap className="h-4 w-4 mr-2" />
                            {user.department}
                          </Badge>
                        )}
                        {user.class_year && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            {user.class_year}. Sınıf
                          </Badge>
                        )}
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-100 border-yellow-400/30 px-4 py-2 text-sm">
                          <Coins className="h-4 w-4 mr-2" />
                          {user.credits} Kredi
                        </Badge>
                </div>
              </div>
              
                    {/* Action Button */}
                        <Button 
                      variant="secondary" 
                      size="lg"
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
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    >
                      {isEditing ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          İptal Et
                        </>
                      ) : (
                        <>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Profili Düzenle
                        </>
                      )}
                        </Button>
                  </div>

                  {/* Rating */}
                  <div className="text-center text-white">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-5xl font-bold mb-2">{user.stats.rating}</div>
                      <p className="text-blue-100 text-lg">Ortalama Puan</p>
                      <div className="flex justify-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`h-4 w-4 ${star <= user.stats.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content with Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg">
                  <TabsTrigger value="overview" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Genel Bakış</span>
                  </TabsTrigger>
                  <TabsTrigger value="languages" className="flex items-center space-x-2">
                    <Languages className="h-4 w-4" />
                    <span>Diller</span>
                  </TabsTrigger>
                  <TabsTrigger value="availability" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Müsaitlik</span>
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Aktivite</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Stats Cards */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-2">{user.stats.total_sessions}</div>
                          <div className="text-gray-600">Toplam Görüşme</div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-2">{user.stats.languages_learned}</div>
                          <div className="text-gray-600">Öğrenilen Dil</div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-2">{user.stats.languages_taught}</div>
                          <div className="text-gray-600">Öğretilen Dil</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Profile Info Section */}
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center space-x-2 text-xl">
                          <User className="h-6 w-6 text-blue-600" />
                          <span>Profil Bilgileri</span>
                        </CardTitle>
                    </CardHeader>
                      <CardContent>
                      {isEditing ? (
                          <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                                <Input
                                name="name"
                                value={editForm.name}
                                onChange={handleFormChange}
                                  placeholder="Adınız"
                              />
                            </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                                <Input
                                name="surname"
                                value={editForm.surname}
                                onChange={handleFormChange}
                                  placeholder="Soyadınız"
                              />
                            </div>
                          </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm</label>
                              <Input
                              name="department"
                              value={editForm.department}
                              onChange={handleFormChange}
                                placeholder="Bölümünüz"
                            />
                          </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Sınıf</label>
                              <Input
                              type="number"
                              name="class_year"
                              value={editForm.class_year}
                              onChange={handleFormChange}
                                placeholder="Sınıfınız"
                              min="1"
                              max="8"
                            />
                          </div>
                            
                            <div className="flex justify-end space-x-3">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsEditing(false)}
                            >
                              İptal
                            </Button>
                              <Button type="submit">
                                  <Save className="h-4 w-4 mr-2" />
                                Kaydet
                            </Button>
                          </div>
                        </form>
                      ) : (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Ad Soyad</label>
                                <p className="text-lg text-gray-900">{user.name} {user.surname}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">E-posta</label>
                                <p className="text-lg text-gray-900">{user.email}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Bölüm</label>
                                <p className="text-lg text-gray-900">{user.department || 'Belirtilmemiş'}</p>
                          </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Sınıf</label>
                                <p className="text-lg text-gray-900">
                                  {user.class_year ? `${user.class_year}. Sınıf` : 'Belirtilmemiş'}
                                </p>
                          </div>
                          </div>
                          </div>
                      )}
                    </CardContent>
                  </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/matching">
                            <Search className="h-4 w-4 mr-2" />
                            Eşleşme Bul
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/sessions">
                            <Calendar className="h-4 w-4 mr-2" />
                            Görüşmeler
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Bell className="h-4 w-4 mr-2" />
                          Bildirimler
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Ayarlar
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Credit Info */}
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center space-x-2 text-lg">
                          <Coins className="h-6 w-6 text-yellow-600" />
                          <span>Kredi Bakiyesi</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-yellow-600 mb-2">{user.credits}</div>
                          <p className="text-gray-600 mb-4">Mevcut Kredi</p>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p>• Her görüşme 1 kredi harcar</p>
                            <p>• Başarılı görüşmeler kredi kazandırır</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Languages Tab */}
              <TabsContent value="languages" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2 text-xl">
                        <Languages className="h-6 w-6 text-blue-600" />
                        <span>Diller</span>
                      </CardTitle>
                          <Button 
                        variant="outline" 
                            size="sm"
                        onClick={() => setShowAddLanguage(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                                Dil Ekle
                          </Button>
                        </div>
                  </CardHeader>
                  <CardContent>
                    {user.languages && user.languages.length > 0 ? (
                      <div className="space-y-4">
                        {user.languages.map((lang) => (
                          <div key={lang.id} className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {lang.code.toUpperCase()}
                                </span>
                      </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{lang.language}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant={lang.role === 'learn' ? 'default' : 'secondary'}>
                                      {lang.role === 'learn' ? 'Öğreniyor' : 'Öğretiyor'}
                                    </Badge>
                                  <Badge variant="outline">{lang.level}</Badge>
                                  </div>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveLanguage(lang.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                      <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                        <Languages className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz dil eklenmemiş</h3>
                        <p className="text-gray-500 mb-6">Öğrenmek veya öğretmek istediğiniz dilleri ekleyin</p>
                        <Button 
                          onClick={() => setShowAddLanguage(true)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          İlk Dilini Ekle
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Availability Tab */}
              <TabsContent value="availability" className="space-y-6">
                <AvailableDays />
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-xl">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                      <span>Aktivite Özeti</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <MessageCircle className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Toplam Görüşme</h3>
                            <p className="text-2xl font-bold text-blue-600">{user.stats.total_sessions}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <Star className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Ortalama Puan</h3>
                            <p className="text-2xl font-bold text-green-600">{user.stats.rating}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Öğrenilen Dil</h3>
                            <p className="text-2xl font-bold text-purple-600">{user.stats.languages_learned}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Öğretilen Dil</h3>
                            <p className="text-2xl font-bold text-orange-600">{user.stats.languages_taught}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>

      {/* Add Language Modal */}
      <Modal open={showAddLanguage} onOpenChange={setShowAddLanguage}>
        <ModalContent className="sm:max-w-[425px]">
          <ModalHeader>
            <ModalTitle>Yeni Dil Ekle</ModalTitle>
            <ModalDescription>
              Öğrenmek veya öğretmek istediğiniz dili seçin.
            </ModalDescription>
          </ModalHeader>
          <form onSubmit={handleAddLanguage} className="space-y-6">
            <div className="space-y-6 p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Dil Seçin
                </label>
                <Select value={newLanguage.code} onValueChange={(value) => setNewLanguage(prev => ({ ...prev, code: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Dil seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
    </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Rol
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="learn"
                      checked={newLanguage.role === 'learn'}
                      onChange={(e) => setNewLanguage(prev => ({ ...prev, role: e.target.value as 'learn' | 'teach' }))}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Öğreniyor</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="teach"
                      checked={newLanguage.role === 'teach'}
                      onChange={(e) => setNewLanguage(prev => ({ ...prev, role: e.target.value as 'learn' | 'teach' }))}
                      className="h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Öğretiyor</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Seviye
                </label>
                <Select value={newLanguage.level} onValueChange={(value) => setNewLanguage(prev => ({ ...prev, level: value as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seviye seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A1">A1 - Başlangıç</SelectItem>
                    <SelectItem value="A2">A2 - Temel</SelectItem>
                    <SelectItem value="B1">B1 - Orta</SelectItem>
                    <SelectItem value="B2">B2 - Orta Üstü</SelectItem>
                    <SelectItem value="C1">C1 - İleri</SelectItem>
                    <SelectItem value="C2">C2 - Uzman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ModalFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowAddLanguage(false)}
                disabled={isAddingLanguage}
              >
                İptal
              </Button>
              <Button 
                type="submit"
                disabled={!newLanguage.code || isAddingLanguage}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
              >
                {isAddingLanguage ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    Ekleniyor...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Dil Ekle
                  </>
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}