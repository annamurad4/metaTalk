'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'

// Dinamik import ile lazy loading
const AuthForm = dynamic(() => import('@/components/forms/auth-form').then(mod => ({ default: mod.AuthForm })), {
  loading: () => <div className="py-8 text-center text-gray-500">Yükleniyor...</div>,
  ssr: false
})

export default function VerifyEmailPage() {
  const router = useRouter()
  const sp = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)
  const [csrf, setCsrf] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

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

  // Arama parametrelerini tek yerde oku ve işaretle
  useEffect(() => {
    const e = sp.get('email')
    const fn = sp.get('firstName')
    const ln = sp.get('lastName')
    setEmail(e)
    setFirstName(fn)
    setLastName(ln)
    const rm = sp.get('rememberMe')
    if (rm != null) {
      setRememberMe(rm === 'true')
    } else {
      try {
        const val = localStorage.getItem('rememberMe')
        if (val != null) setRememberMe(val === 'true')
      } catch {}
    }
    setInitialized(true)
  }, [sp])

  useEffect(() => {
    if (!initialized) return
    if (!email) {
      router.replace(ROUTES.LOGIN)
    }
  }, [initialized, email, router])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleSubmit = async (data: { code: string }) => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrf,
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email, 
          code: data.code,
          firstName,
          lastName,
          rememberMe,
        }),
      })

      const result = await response.json()

      if (result.success) {
        const redirectTo = result.redirectTo || ROUTES.PROFILE
        setSuccess('E-posta başarıyla doğrulandı! Yönlendiriliyorsunuz...')
        // Cookie yazıldıktan hemen sonra yönlendirme güvenli; beklemeye gerek yok
        router.push(redirectTo)
      } else {
        setError(result.error || 'Doğrulama hatası')
      }
    } catch (error) {
      setError('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCooldown > 0) return

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrf,
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email, 
          mode: firstName && lastName ? 'register' : 'login' 
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('Yeni kod gönderildi! E-postanızı kontrol edin.')
        setResendCooldown(60) // 60 saniye cooldown
      } else {
        setError(result.error || 'Kod gönderilemedi')
      }
    } catch (error) {
      setError('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
  }

  if (!initialized) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      {/* Arka plan daha hafif */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-50"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href={firstName && lastName ? ROUTES.REGISTER : ROUTES.LOGIN}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Geri Dön
          </Link>
        </div>

        <AuthForm
          type="otp"
          onSubmit={handleSubmit}
          loading={isLoading}
          error={error}
          success={success}
          email={email || undefined}
          onResendCode={handleResendCode}
          resendCooldown={resendCooldown}
        />

        {/* Additional Info */}
        <div className="mt-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <RefreshCw className="h-4 w-4" />
            <span>Kod gelmedi mi? Spam klasörünü kontrol edin</span>
          </div>
          
          <p className="text-sm text-gray-500">
            Kod 5 dakika içinde geçerliliğini yitirir
          </p>
        </div>
      </div>
    </div>
  )
}


