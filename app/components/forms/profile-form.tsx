'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Combobox, Avatar, Badge } from '@/components/ui'
import { User, Mail, GraduationCap, Calendar, Globe, Plus, X, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'

// CEFR seviyeleri
const CEFR_LEVELS = [
  { value: 'A1', label: 'A1 - Başlangıç' },
  { value: 'A2', label: 'A2 - Temel' },
  { value: 'B1', label: 'B1 - Orta' },
  { value: 'B2', label: 'B2 - Orta Üst' },
  { value: 'C1', label: 'C1 - İleri' },
  { value: 'C2', label: 'C2 - Uzman' },
] as const

// Dil seçenekleri
const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'İngilizce' },
  { value: 'de', label: 'Almanca' },
  { value: 'fr', label: 'Fransızca' },
  { value: 'es', label: 'İspanyolca' },
  { value: 'it', label: 'İtalyanca' },
  { value: 'pt', label: 'Portekizce' },
  { value: 'ru', label: 'Rusça' },
  { value: 'ar', label: 'Arapça' },
  { value: 'zh', label: 'Çince' },
  { value: 'ja', label: 'Japonca' },
  { value: 'ko', label: 'Korece' },
  { value: 'tr', label: 'Türkçe' },
] as const

// Bölüm seçenekleri
const DEPARTMENT_OPTIONS = [
  { value: 'bilgisayar', label: 'Bilgisayar Mühendisliği' },
  { value: 'elektrik', label: 'Elektrik-Elektronik Mühendisliği' },
  { value: 'endustri', label: 'Endüstri Mühendisliği' },
  { value: 'makine', label: 'Makine Mühendisliği' },
  { value: 'inşaat', label: 'İnşaat Mühendisliği' },
  { value: 'tip', label: 'Tıp' },
  { value: 'dis', label: 'Diş Hekimliği' },
  { value: 'eczacilik', label: 'Eczacılık' },
  { value: 'hukuk', label: 'Hukuk' },
  { value: 'isletme', label: 'İşletme' },
  { value: 'ekonomi', label: 'Ekonomi' },
  { value: 'psikoloji', label: 'Psikoloji' },
  { value: 'sosyoloji', label: 'Sosyoloji' },
  { value: 'tarih', label: 'Tarih' },
  { value: 'edebiyat', label: 'Edebiyat' },
  { value: 'diger', label: 'Diğer' },
] as const

// Sınıf seçenekleri
const CLASS_OPTIONS = [
  { value: '1', label: '1. Sınıf' },
  { value: '2', label: '2. Sınıf' },
  { value: '3', label: '3. Sınıf' },
  { value: '4', label: '4. Sınıf' },
  { value: '5', label: '5. Sınıf' },
  { value: '6', label: '6. Sınıf' },
  { value: 'yuksek', label: 'Yüksek Lisans' },
  { value: 'doktora', label: 'Doktora' },
] as const

// Validation schema
const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalı')
    .max(50, 'Ad en fazla 50 karakter olabilir'),
  lastName: z
    .string()
    .min(2, 'Soyad en az 2 karakter olmalı')
    .max(50, 'Soyad en fazla 50 karakter olabilir'),
  email: z
    .string()
    .email('Geçerli bir e-posta adresi girin')
    .refine((email) => email.endsWith('@std.medipol.edu.tr'), {
      message: 'Sadece Medipol Üniversitesi e-posta adresleri kabul edilir'
    }),
  department: z
    .string()
    .min(1, 'Bölüm seçimi gerekli'),
  class: z
    .string()
    .min(1, 'Sınıf seçimi gerekli'),
  avatarUrl: z
    .string()
    .url('Geçerli bir URL girin')
    .optional()
    .or(z.literal('')),
  learningLanguages: z
    .array(z.string())
    .min(1, 'En az bir dil seçmelisiniz')
    .max(5, 'En fazla 5 dil seçebilirsiniz'),
  teachingLanguages: z
    .array(z.string())
    .min(1, 'En az bir dil seçmelisiniz')
    .max(5, 'En fazla 5 dil seçebilirsiniz'),
  languageLevels: z.record(z.string(), z.string()),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>
  onSubmit: (data: ProfileFormData) => void
  loading?: boolean
  error?: string
  success?: string
  className?: string
}

const ProfileForm = React.forwardRef<HTMLFormElement, ProfileFormProps>(
  ({ initialData, onSubmit, loading = false, error, success, className }, ref) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [languageLevels, setLanguageLevels] = React.useState<Record<string, string>>({})

    const {
      register,
      handleSubmit,
      formState: { errors, isValid, isDirty },
      watch,
      setValue,
      trigger
    } = useForm<ProfileFormData>({
      resolver: zodResolver(profileSchema),
      mode: 'onChange',
      defaultValues: {
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        email: initialData?.email || '',
        department: initialData?.department || '',
        class: initialData?.class || '',
        avatarUrl: initialData?.avatarUrl || '',
        learningLanguages: initialData?.learningLanguages || [],
        teachingLanguages: initialData?.teachingLanguages || [],
        languageLevels: initialData?.languageLevels || {},
      }
    })

    const watchedLearningLanguages = watch('learningLanguages')
    const watchedTeachingLanguages = watch('teachingLanguages')

    // Handle form submission
    const handleFormSubmit = async (data: ProfileFormData) => {
      setIsSubmitting(true)
      try {
        await onSubmit({ ...data, languageLevels })
      } finally {
        setIsSubmitting(false)
      }
    }

    // Handle language level change
    const handleLanguageLevelChange = (language: string, level: string) => {
      setLanguageLevels(prev => ({
        ...prev,
        [language]: level
      }))
    }

    // Get language name by code
    const getLanguageName = (code: string) => {
      return LANGUAGE_OPTIONS.find(option => option.value === code)?.label || code
    }

    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
    }

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: 'easeOut' as any }}
        className={cn('w-full max-w-4xl mx-auto', className)}
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-2">
            <motion.div variants={itemVariants} transition={{ duration: 0.4, ease: 'easeOut' as any }}>
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} transition={{ duration: 0.4, ease: 'easeOut' as any }}>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Profil Bilgileri
              </CardTitle>
            </motion.div>
            
            <motion.div variants={itemVariants} transition={{ duration: 0.4, ease: 'easeOut' as any }}>
              <CardDescription className="text-gray-600">
                Profil bilgilerinizi güncelleyin ve dil tercihlerinizi belirleyin
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-3 bg-accent-50 border border-accent-200 rounded-lg"
              >
                <X className="h-5 w-5 text-accent-600 flex-shrink-0" />
                <p className="text-sm text-accent-700">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-3 bg-success-50 border border-success-200 rounded-lg"
              >
                <Save className="h-5 w-5 text-success-600 flex-shrink-0" />
                <p className="text-sm text-success-700">{success}</p>
              </motion.div>
            )}

            <form ref={ref} onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Personal Information */}
              <motion.div variants={itemVariants} transition={{ duration: 0.4, ease: 'easeOut' as any }} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Kişisel Bilgiler
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    {...register('firstName')}
                    label="Ad"
                    placeholder="Adınız"
                    leftIcon={<User className="h-4 w-4" />}
                    error={errors.firstName?.message}
                    disabled={loading || isSubmitting}
                  />
                  
                  <Input
                    {...register('lastName')}
                    label="Soyad"
                    placeholder="Soyadınız"
                    leftIcon={<User className="h-4 w-4" />}
                    error={errors.lastName?.message}
                    disabled={loading || isSubmitting}
                  />
                </div>

                <Input
                  {...register('email')}
                  type="email"
                  label="E-posta"
                  placeholder="ornek@std.medipol.edu.tr"
                  leftIcon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                  helperText="Sadece Medipol Üniversitesi e-posta adresleri kabul edilir"
                  disabled={loading || isSubmitting}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Select
                      value={watch('department')}
                      onValueChange={(v) => setValue('department', v)}
                      disabled={loading || isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Bölümünüzü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.department?.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.department.message}</p>
                    )}
                  </div>

                  <div>
                    <Select
                      value={watch('class')}
                      onValueChange={(v) => setValue('class', v)}
                      disabled={loading || isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sınıfınızı seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {CLASS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.class?.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.class.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Avatar Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profil Fotoğrafı
                </h3>
                
                <div className="flex items-center gap-6">
                  <Avatar
                    size="xl"
                    src={watch('avatarUrl')}
                    fallback={getInitials(`${watch('firstName')} ${watch('lastName')}`)}
                    className="border-4 border-white shadow-lg"
                  />
                  
                  <div className="flex-1">
                    <Input
                      {...register('avatarUrl')}
                      label="Avatar URL"
                      placeholder="https://example.com/avatar.jpg"
                      leftIcon={<Globe className="h-4 w-4" />}
                      error={errors.avatarUrl?.message}
                      helperText="İsteğe bağlı - Profil fotoğrafı URL'si"
                      disabled={loading || isSubmitting}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Language Preferences */}
              <motion.div variants={itemVariants} transition={{ duration: 0.4, ease: 'easeOut' as any }} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Dil Tercihleri
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Combobox
                      options={LANGUAGE_OPTIONS}
                      value={watchedLearningLanguages}
                      onChange={(value) => setValue('learningLanguages', value)}
                      label="Öğrenmek İstediğiniz Diller"
                      placeholder="Dil seçin..."
                      searchPlaceholder="Dil ara..."
                      emptyText="Dil bulunamadı"
                      error={errors.learningLanguages?.message}
                      helperText="En az 1, en fazla 5 dil seçebilirsiniz"
                      maxSelections={5}
                      disabled={loading || isSubmitting}
                    />

                    {/* Learning Language Levels */}
                    {watchedLearningLanguages.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Öğrenmek istediğiniz dillerin seviyeleri:
                        </h4>
                        {watchedLearningLanguages.map((language) => (
                          <div key={language} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-24">
                              {getLanguageName(language)}
                            </span>
                            <Select
                              value={languageLevels[language] || ''}
                              onValueChange={(v) => handleLanguageLevelChange(language, v)}
                              disabled={loading || isSubmitting}
                              className="flex-1"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seviye seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                {CEFR_LEVELS.map((level) => (
                                  <SelectItem key={level.value} value={level.value}>
                                    {level.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Combobox
                      options={LANGUAGE_OPTIONS}
                      value={watchedTeachingLanguages}
                      onChange={(value) => setValue('teachingLanguages', value)}
                      label="Öğretebileceğiniz Diller"
                      placeholder="Dil seçin..."
                      searchPlaceholder="Dil ara..."
                      emptyText="Dil bulunamadı"
                      error={errors.teachingLanguages?.message}
                      helperText="En az 1, en fazla 5 dil seçebilirsiniz"
                      maxSelections={5}
                      disabled={loading || isSubmitting}
                    />

                    {/* Teaching Language Levels */}
                    {watchedTeachingLanguages.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Öğretebileceğiniz dillerin seviyeleri:
                        </h4>
                        {watchedTeachingLanguages.map((language) => (
                          <div key={language} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-24">
                              {getLanguageName(language)}
                            </span>
                            <Select
                              value={languageLevels[language] || ''}
                              onValueChange={(v) => handleLanguageLevelChange(language, v)}
                              disabled={loading || isSubmitting}
                              className="flex-1"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seviye seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                {CEFR_LEVELS.map((level) => (
                                  <SelectItem key={level.value} value={level.value}>
                                    {level.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} transition={{ duration: 0.4, ease: 'easeOut' as any }} className="flex justify-end pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  size="lg"
                  variant="gradient"
                  loading={loading || isSubmitting}
                  disabled={!isValid || !isDirty || loading || isSubmitting}
                  className="min-w-[120px]"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    )
  }
)
ProfileForm.displayName = 'ProfileForm'

export { ProfileForm }
