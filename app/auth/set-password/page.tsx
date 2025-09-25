'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function SetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [csrf, setCsrf] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (password !== confirmPassword) {
      setError('Parolalar eşleşmiyor')
      return
    }
    setLoading(true)
    try {
      // CSRF token eksikse kullanıcıyı bilgilendir
      if (!csrf) {
        setError('Güvenlik token\'ı eksik. Lütfen sayfayı yenileyip tekrar deneyin.')
        return
      }

      const res = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-csrf-token': csrf
        },
        credentials: 'include',
        body: JSON.stringify({ password, confirmPassword })
      })
      const data = await res.json()
      if (data.success) {
        setSuccess('Parolanız oluşturuldu! Yönlendiriliyorsunuz...')
        setTimeout(() => router.push('/profile'), 1200)
      } else {
        setError(data.error || 'İşlem başarısız')
      }
    } catch (err) {
      setError('Bağlantı hatası')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Parola Belirle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type={showPassword ? "text" : "password"}
                label="Parola"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                helperText="En az 8 karakter, en az bir büyük harf, bir küçük harf ve bir rakam içermeli"
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
              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Parola (Tekrar)"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="focus:outline-none"
                    aria-label={showConfirmPassword ? "Parolayı gizle" : "Parolayı göster"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              {error && (
                <div className="flex items-center gap-2 p-3 bg-accent-50 border border-accent-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-accent-600 flex-shrink-0" />
                  <p className="text-sm text-accent-700">{error}</p>
                </div>
              )}
              {success && <p className="text-sm text-success-600 p-3 bg-success-50 border border-success-200 rounded-lg">{success}</p>}
              <Button type="submit" variant="gradient" fullWidth loading={loading} disabled={loading}>
                Parolayı Kaydet
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}






