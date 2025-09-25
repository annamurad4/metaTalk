'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  MessageSquare, 
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Lightbulb,
  Heart,
  Send,
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone,
  Globe,
  Video,
  Users,
  Shield,
  MessageCircle,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

export default function FeedbackPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    feedbackType: 'general' as 'general' | 'bug' | 'feature' | 'improvement' | 'complaint',
    rating: 0,
    subject: '',
    message: '',
    experience: 'good' as 'excellent' | 'good' | 'average' | 'poor',
    recommend: 'yes' as 'yes' | 'no' | 'maybe'
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simüle edilmiş form gönderimi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setShowSuccess(true)
    setIsSubmitting(false)
    
    // Formu temizle
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        feedbackType: 'general',
        rating: 0,
        subject: '',
        message: '',
        experience: 'good',
        recommend: 'yes'
      })
      setShowSuccess(false)
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const feedbackTypes = [
    { value: 'general', label: 'Genel Geri Bildirim', icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
    { value: 'bug', label: 'Hata Bildirimi', icon: AlertTriangle, color: 'from-red-500 to-red-600' },
    { value: 'feature', label: 'Özellik Önerisi', icon: Lightbulb, color: 'from-green-500 to-green-600' },
    { value: 'improvement', label: 'İyileştirme Önerisi', icon: ThumbsUp, color: 'from-purple-500 to-purple-600' },
    { value: 'complaint', label: 'Şikayet', icon: ThumbsDown, color: 'from-orange-500 to-orange-600' }
  ]

  const experienceOptions = [
    { value: 'excellent', label: 'Mükemmel', icon: '⭐⭐⭐⭐⭐', color: 'text-green-600' },
    { value: 'good', label: 'İyi', icon: '⭐⭐⭐⭐', color: 'text-blue-600' },
    { value: 'average', label: 'Orta', icon: '⭐⭐⭐', color: 'text-yellow-600' },
    { value: 'poor', label: 'Kötü', icon: '⭐⭐', color: 'text-red-600' }
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      
      <main className="relative pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-700 text-sm font-semibold shadow-sm backdrop-blur-sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Geri Bildirim
                </div>
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Görüşleriniz{' '}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Bizim İçin Değerli
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
              >
                MetaTalk'u daha iyi hale getirmek için{' '}
                <span className="font-semibold text-gray-800">görüşlerinizi paylaşın</span>. 
                Her geri bildirim bizim için önemli!
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Feedback Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="max-w-4xl mx-auto"
            >
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Geri Bildiriminiz Alındı!
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Görüşleriniz için teşekkür ederiz. En kısa sürede değerlendirilecektir.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <Clock className="h-5 w-5" />
                    <span>3 saniye sonra form temizlenecek...</span>
                  </div>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Geri Bildirim Formu
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Deneyiminizi bizimle paylaşın ve MetaTalk'u birlikte geliştirelim.
                    </p>
                  </motion.div>

                  <Card className="p-8 border-0 bg-white shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Personal Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Adınız Soyadınız
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            placeholder="Adınızı ve soyadınızı girin"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            E-posta Adresiniz
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            placeholder="ornek@medipol.edu.tr"
                          />
                        </div>
                      </div>

                      {/* Feedback Type */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          Geri Bildirim Türü
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {feedbackTypes.map((type) => (
                            <label
                              key={type.value}
                              className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                formData.feedbackType === type.value
                                  ? `border-${type.color.split('-')[1]}-500 bg-${type.color.split('-')[1]}-50`
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="feedbackType"
                                value={type.value}
                                checked={formData.feedbackType === type.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <div className="flex flex-col items-center space-y-2">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                                  <type.icon className="h-5 w-5 text-white" />
                                </div>
                                <span className={`text-sm font-medium text-center ${
                                  formData.feedbackType === type.value ? 'text-gray-900' : 'text-gray-600'
                                }`}>
                                  {type.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Rating */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          Genel Memnuniyet (1-5 Yıldız)
                        </label>
                        <div className="flex items-center justify-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingClick(star)}
                              className={`transition-all duration-300 hover:scale-110 ${
                                star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              <Star className="h-8 w-8 fill-current" />
                            </button>
                          ))}
                        </div>
                        <p className="text-center text-gray-600 mt-2">
                          {formData.rating === 0 ? 'Bir yıldız seçin' : 
                           formData.rating === 1 ? 'Çok kötü' :
                           formData.rating === 2 ? 'Kötü' :
                           formData.rating === 3 ? 'Orta' :
                           formData.rating === 4 ? 'İyi' : 'Mükemmel'}
                        </p>
                      </div>

                      {/* Experience */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          MetaTalk Deneyiminiz Nasıldı?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {experienceOptions.map((option) => (
                            <label
                              key={option.value}
                              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                formData.experience === option.value
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="experience"
                                value={option.value}
                                checked={formData.experience === option.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <div className="text-2xl mb-2">{option.icon}</div>
                              <span className={`text-sm font-medium ${option.color}`}>
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Recommend */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          MetaTalk'u arkadaşlarınıza tavsiye eder misiniz?
                        </label>
                        <div className="flex items-center justify-center space-x-8">
                          {[
                            { value: 'yes', label: 'Evet', icon: ThumbsUp, color: 'text-green-600' },
                            { value: 'maybe', label: 'Belki', icon: Heart, color: 'text-yellow-600' },
                            { value: 'no', label: 'Hayır', icon: ThumbsDown, color: 'text-red-600' }
                          ].map((option) => (
                            <label
                              key={option.value}
                              className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-300 ${
                                formData.recommend === option.value ? 'scale-110' : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name="recommend"
                                value={option.value}
                                checked={formData.recommend === option.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <option.icon className={`h-8 w-8 ${option.color}`} />
                              <span className={`text-sm font-medium ${option.color}`}>
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Konu
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          placeholder="Geri bildiriminizin konusu"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Detaylı Mesajınız
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="Görüşlerinizi, önerilerinizi veya sorunlarınızı detaylı bir şekilde yazın..."
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting || formData.rating === 0}
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Gönderiliyor...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Send className="h-5 w-5" />
                            <span>Geri Bildirim Gönder</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </Card>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 border border-white/30 text-white text-sm font-semibold shadow-sm backdrop-blur-sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Daha Fazla Yardım mı Lazım?
                </div>
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
              >
                Bizimle{' '}
                <span className="text-yellow-300">İletişime Geçin</span>
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed font-light mb-12"
              >
                Sorularınız, önerileriniz veya acil destek ihtiyaçlarınız için{' '}
                <span className="font-semibold text-white">her zaman buradayız</span>
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="xl" variant="glass" className="group relative overflow-hidden bg-white text-green-700 hover:bg-white/95 px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2" asChild>
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      <MessageCircle className="mr-3 h-6 w-6" />
                      İletişime Geç
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                
                <Button size="xl" variant="outline" className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 px-10 py-5 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" asChild>
                  <Link href="/help">
                    <span className="flex items-center">
                      <HelpCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      Yardım Merkezi
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

