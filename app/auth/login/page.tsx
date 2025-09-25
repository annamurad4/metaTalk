'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Card, CardHeader, CardContent, CardTitle, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

// Dinamik import ile lazy loading
const AuthForm = dynamic(() => import('@/components/forms/auth-form').then(mod => ({ default: mod.AuthForm })), {
  loading: () => <div className="py-8 text-center text-gray-500">Yükleniyor...</div>,
  ssr: false // İlk yüklemede sunucu tarafında render etme
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [pwEmail, setPwEmail] = useState('')
  const [pwPassword, setPwPassword] = useState('')
  const [csrf, setCsrf] = useState('')
  const [pwRemember, setPwRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // CSRF token'ı API endpoint'inden al
  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        // Doğrudan API'den yeni token al (cookie otomatik ayarlanacak)
        const response = await fetch('/api/auth/bypass-csrf')
        const data = await response.json()
        if (data.success && data.token) {
          console.log('New CSRF token generated:', data.token)
          setCsrf(data.token)
        } else {
          console.error('CSRF token alınamadı:', data)
        }
      } catch (err) {
        console.error('CSRF token alınamadı:', err)
      }
    }
    
    fetchCsrfToken()
  }, [])

  const handleSubmit = async (data: { email: string; rememberMe?: boolean }) => {
    setIsLoading(true)
    setError('')

    try {
      // AuthForm içindeki Zod transform tam e-postayı zaten oluşturuyor
      const email = data.email

      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrf,
        },
        body: JSON.stringify({ email, mode: 'login', rememberMe: data.rememberMe ?? true }),
      })

      const result = await response.json()

      if (result.success) {
        try { localStorage.setItem('rememberMe', String(data.rememberMe ?? true)) } catch {}
        router.push(`${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}&rememberMe=${encodeURIComponent(String(data.rememberMe ?? true))}`)
      } else {
        setError(result.error || 'Bir hata oluştu')
      }
    } catch (error) {
      setError('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      // Kullanıcı adına domain ekleyerek tam e-posta adresini oluşturuyoruz
      // Email formatını düzgünce hazırla
      const email = pwEmail.includes('@') ? pwEmail : `${pwEmail}@std.medipol.edu.tr`;
      
      console.log('Login attempt:', { email, rememberMe: pwRemember });
      
      const res = await fetch('/api/auth/login-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'x-csrf-token': csrf 
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email, 
          password: pwPassword, 
          rememberMe: pwRemember 
        })
      })
      const data = await res.json()
      console.log('Login response:', data);
      
      if (data.success) {
        try { localStorage.setItem('rememberMe', String(pwRemember)) } catch {}
        // Önce manuel navigate ediyoruz
        window.location.href = ROUTES.PROFILE
      } else {
        // Daha detaylı hata mesajı göster
        if (data.details && Array.isArray(data.details)) {
          setError(data.details.map((d: { message: string }) => d.message).join(', '))
        } else {
          setError(data.error || 'Giriş başarısız')
        }
      }
    } catch (err) {
      setError('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative">
      {/* Arka plan animasyonu daha hafif hale getirildi */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-50"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfaya Dön
          </Link>
        </div>

        <div className="flex items-center justify-center">
          {/* Centered auth card with tabs */}
          <div className="w-full max-w-xl mx-auto">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Hesabınıza Giriş Yapın</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="password">
                  <div className="flex items-center justify-center">
                    <TabsList className="grid grid-cols-2 w-full max-w-xs">
                      <TabsTrigger value="password">Parola ile Giriş</TabsTrigger>
                      <TabsTrigger value="otp">Kod ile Giriş</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="password" className="pt-6">
                    <form onSubmit={handlePasswordLogin} className="space-y-3">
                      <Input
                        label="E-posta"
                        placeholder="isim.soyisim"
                        rightAddon="@std.medipol.edu.tr"
                        value={pwEmail}
                        onChange={(e) => {
                          // @ işaretini ve sonrasını filtrele, boşlukları temizle
                          let value = e.target.value;
                          if (value.includes('@')) {
                            value = value.split('@')[0];
                          }
                          setPwEmail(value.replace(/\s+/g, ''));
                        }}
                        disabled={isLoading}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        label="Parola"
                        placeholder="••••••••"
                        value={pwPassword}
                        onChange={(e) => setPwPassword(e.target.value)}
                        disabled={isLoading}
                        rightIcon={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="focus:outline-none"
                            aria-label={showPassword ? "Parolayı gizle" : "Parolayı göster"}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        }
                      />
                      {/* Remember me for password tab */}
                      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input 
                          type="checkbox" 
                          checked={pwRemember}
                          onChange={(e) => setPwRemember(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                        />
                        Beni hatırla
                      </label>
                      <div className="flex items-center justify-between">
                        <button type="button" className="text-sm text-primary-600 hover:text-primary-700">Şifremi unuttum</button>
                        <Button type="submit" variant="gradient" loading={isLoading} disabled={isLoading}>Giriş Yap</Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="otp" className="pt-6">
                    <Suspense fallback={<div className="py-8 text-center text-gray-500">Yükleniyor...</div>}>
                      <AuthForm
                        type="login"
                        onSubmit={handleSubmit}
                        loading={isLoading}
                        error={error}
                      />
                    </Suspense>
                  </TabsContent>
                </Tabs>
                <div className="mt-6 text-center text-gray-600">
                  Hesabınız yok mu?{' '}
                  <Link href={ROUTES.REGISTER} className="text-primary-600 hover:text-primary-700 font-medium transition-colors">Kayıt olun</Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



