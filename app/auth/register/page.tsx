'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Dinamik import ile lazy loading
const AuthForm = dynamic(() => import('@/components/forms/auth-form').then(mod => ({ default: mod.AuthForm })), {
  loading: () => <div className="py-8 text-center text-gray-500">Yükleniyor...</div>,
  ssr: false
})

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [csrf, setCsrf] = useState('')

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
  const [error, setError] = useState('')

  const handleSubmit = async (data: { firstName: string; lastName: string; email: string; rememberMe?: boolean }) => {
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
        body: JSON.stringify({ email, mode: 'register', rememberMe: data.rememberMe ?? true }),
      })

      const result = await response.json()

      if (result.success) {
        try { localStorage.setItem('rememberMe', String(data.rememberMe ?? true)) } catch {}
        router.push(
          `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(data.firstName)}&lastName=${encodeURIComponent(data.lastName)}&rememberMe=${encodeURIComponent(String(data.rememberMe ?? true))}`
        )
      } else {
        setError(result.error || 'Bir hata oluştu')
      }
    } catch (error) {
      setError('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      {/* Arka plan daha hafif */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-50"></div>

      <div className="relative z-10 w-full max-w-md">
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

        {/* Auth Form */}
        <Suspense fallback={<div className="py-8 text-center text-gray-500">Yükleniyor...</div>}>
          <AuthForm
            type="register"
            onSubmit={handleSubmit}
            loading={isLoading}
            error={error}
          />
        </Suspense>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Zaten hesabınız var mı?{' '}
            <Link
              href={ROUTES.LOGIN}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Giriş yapın
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


