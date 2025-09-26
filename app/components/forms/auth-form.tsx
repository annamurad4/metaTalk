'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button, Input, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Validation schemas
// Kullanıcı adı: harf, rakam, nokta ve tire izinli; domain eklenmeyecek
const usernameSchema = z
  .string()
  .trim()
  .min(1, 'Kullanıcı adı gerekli')
  .regex(/^[a-z0-9]+([._-][a-z0-9]+)*$/i, 'Sadece harf, rakam, . ve - kullanılabilir')
  .refine((val) => !val.includes('@'), {
    message: 'Sadece kullanıcı adını yazın, @ eklemeyin'
  })

const loginSchema = z.object({
  email: usernameSchema.transform((val) => `${val.toLowerCase()}@std.medipol.edu.tr`),
  rememberMe: z.boolean().default(true),
})

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalı')
    .max(50, 'Ad en fazla 50 karakter olabilir'),
  lastName: z
    .string()
    .min(2, 'Soyad en az 2 karakter olmalı')
    .max(50, 'Soyad en fazla 50 karakter olabilir'),
  email: usernameSchema.transform((val) => `${val.toLowerCase()}@std.medipol.edu.tr`),
  rememberMe: z.boolean().default(true),
})

const otpSchema = z.object({
  code: z
    .string()
    .min(4, 'Kod 4 haneli olmalı')
    .max(4, 'Kod 4 haneli olmalı')
    .regex(/^\d{4}$/, 'Kod sadece rakamlardan oluşmalı'),
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>
type OTPFormData = z.infer<typeof otpSchema>

interface AuthFormProps {
  type: 'login' | 'register' | 'otp'
  onSubmit: (data: any) => void
  loading?: boolean
  error?: string
  success?: string
  email?: string
  onResendCode?: () => void
  resendCooldown?: number
  className?: string
}

const AuthForm = React.forwardRef<HTMLFormElement, AuthFormProps>(
  ({ 
    type, 
    onSubmit, 
    loading = false, 
    error, 
    success, 
    email, 
    onResendCode,
    resendCooldown = 0,
    className 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const schema = type === 'login' ? loginSchema : type === 'register' ? registerSchema : otpSchema

    // Type assertion ile type safety sağlıyoruz
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      watch,
      setValue,
      trigger
    } = useForm({
      resolver: zodResolver(schema),
      mode: 'onChange'
    }) as any // TypeScript hata vermemesi için tip uyumsuzluklarını çözüyoruz

    const watchedCode = watch('code' as any) || ''

    // Handle form submission
    const handleFormSubmit = async (data: any) => {
      setIsSubmitting(true)
      try {
        await onSubmit(data)
      } finally {
        setIsSubmitting(false)
      }
    }

    // Handle OTP input change
    const handleOTPChange = (value: string) => {
      setValue('code' as any, value)
      trigger('code' as any)
    }

    // Framer Motion animasyon varyantları
    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut" as const
        }
      }
    }

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut" as const
        }
      }
    }

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn('w-full max-w-md mx-auto', className)}
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-2">
            <motion.div variants={itemVariants}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {type === 'login' && 'Giriş Yap'}
                {type === 'register' && 'Kayıt Ol'}
                {type === 'otp' && 'E-posta Doğrulama'}
              </CardTitle>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <CardDescription className="text-gray-600">
                {type === 'login' && 'Hesabınıza giriş yapın'}
                {type === 'register' && 'Yeni hesap oluşturun'}
                {type === 'otp' && `${email} adresine gönderilen 4 haneli kodu girin`}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                  {/* Kullanıcıya yardımcı ipuçları */}
                  {error.includes('Hesap bulunamadı') && (
                    <p className="text-xs text-red-600 mt-1">
                      Kullanıcı adınızı kontrol edin. Nokta ve tire kullanabilirsiniz.
                    </p>
                  )}
                  {error.includes('hesap mevcut') && (
                    <p className="text-xs text-red-600 mt-1">
                      Bu e-posta ile zaten kayıt olmuşsunuz. Giriş yapmayı deneyin.
                    </p>
                  )}
                  {error.includes('Geçersiz veri') && (
                    <p className="text-xs text-red-600 mt-1">
                      Girdiğiniz bilgileri kontrol edin.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-3 bg-success-50 border border-success-200 rounded-lg"
              >
                <CheckCircle className="h-5 w-5 text-success-600 flex-shrink-0" />
                <p className="text-sm text-success-700">{success}</p>
              </motion.div>
            )}

            <form ref={ref} onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
              {type === 'register' && (
                <>
                  <motion.div variants={itemVariants}>
                    <Input
                      {...register('firstName')}
                      label="Ad"
                      placeholder="Adınız"
                      leftIcon={<User className="h-4 w-4" />}
                      error={errors.firstName?.message}
                      disabled={loading || isSubmitting}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Input
                      {...register('lastName')}
                      label="Soyad"
                      placeholder="Soyadınız"
                      leftIcon={<User className="h-4 w-4" />}
                      error={errors.lastName?.message}
                      disabled={loading || isSubmitting}
                    />
                  </motion.div>
                </>
              )}

              {type !== 'otp' && (
                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <Input
                      {...register('email')}
                      type="text"
                      label="E-posta"
                      placeholder="isim.soyisim"
                      leftIcon={<Mail className="h-4 w-4" />}
                      rightAddon="@std.medipol.edu.tr"
                      error={errors.email?.message}
                      helperText="Sadece kullanıcı adınızı yazın, örn: isim.soyisim"
                      disabled={loading || isSubmitting}
                      onChange={(e) => {
                        // @ işaretini ve sonrasını filtrele, boşlukları temizle
                        let value = e.target.value;
                        if (value.includes('@')) {
                          value = value.split('@')[0]; // @ işaretinden önceki kısmı al
                        }
                        value = value.replace(/\s+/g, ''); // Boşlukları temizle
                        
                        // Formda sadece kullanıcı adı kısmını tutuyoruz
                        setValue('email' as any, value);
                        // Doğrulamayı tetikle
                        trigger('email' as any);
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {type === 'otp' && (
                <motion.div variants={itemVariants}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Doğrulama Kodu
                    </label>
                    <div className="flex gap-2 justify-center">
                      {Array.from({ length: 4 }, (_, index) => (
                        <Input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]"
                          maxLength={1}
                          value={watchedCode[index] || ''}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 1)
                            const newCode = watchedCode.split('')
                            newCode[index] = value
                            setValue('code' as any, newCode.join(''))
                            trigger('code' as any)
                            
                            // Auto-focus next input
                            if (value && index < 3) {
                              const target = e.target as HTMLElement
                              const container = target.parentElement?.parentElement
                              if (container) {
                                const nextInput = container.querySelector(`input:nth-child(${index + 2})`) as HTMLInputElement
                                nextInput?.focus()
                              }
                            }
                          }}
                          onPaste={(e) => {
                            e.preventDefault()
                            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
                            if (pastedData.length > 0) {
                              const newCode = pastedData.split('')
                              // Pad with empty strings if less than 4 digits
                              while (newCode.length < 4) {
                                newCode.push('')
                              }
                              setValue('code' as any, newCode.join(''))
                              trigger('code' as any)
                              
                              // Focus the last filled input or the first empty one
                              const lastFilledIndex = Math.min(pastedData.length - 1, 3)
                              const target = e.target as HTMLElement
                              const container = target.parentElement?.parentElement
                              if (container) {
                                const nextInput = container.querySelector(`input:nth-child(${lastFilledIndex + 1})`) as HTMLInputElement
                                nextInput?.focus()
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !watchedCode[index] && index > 0) {
                              const target = e.target as HTMLElement
                              const container = target.parentElement?.parentElement
                              if (container) {
                                const prevInput = container.querySelector(`input:nth-child(${index})`) as HTMLInputElement
                                prevInput?.focus()
                              }
                            }
                          }}
                          className={cn(
                            'w-12 h-12 text-center text-2xl font-bold border-2',
                            errors.code
                              ? 'border-accent-500 focus:border-accent-500 focus:ring-accent-500'
                              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
                            watchedCode[index] && 'border-primary-500 bg-primary-50'
                          )}
                          disabled={loading || isSubmitting}
                        />
                      ))}
                    </div>
                    {errors.code && (
                      <p className="text-sm text-accent-600 text-center">
                        {errors.code.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Remember me */}
              {type !== 'otp' && (
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    Beni hatırla
                  </label>
                </motion.div>
              )}

              <div>
                <Button
                  type="submit"
                  size="lg"
                  variant="gradient"
                  fullWidth
                  loading={loading || isSubmitting}
                  disabled={loading || isSubmitting}
                >
                  {type === 'login' && 'Kod Gönder'}
                  {type === 'register' && 'Kayıt Ol'}
                  {type === 'otp' && 'Doğrula'}
                </Button>
              </div>

              {type === 'otp' && onResendCode && (
                <motion.div variants={itemVariants} className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Kodu almadınız mı?
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onResendCode}
                    disabled={resendCooldown > 0 || loading || isSubmitting}
                  >
                    {resendCooldown > 0 
                      ? `${resendCooldown} saniye sonra tekrar gönder`
                      : 'Kodu tekrar gönder'
                    }
                  </Button>
                </motion.div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    )
  }
)
AuthForm.displayName = 'AuthForm'

export { AuthForm }
