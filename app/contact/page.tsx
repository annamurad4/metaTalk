'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageCircle,
  AlertTriangle,
  Lightbulb,
  User,
  Building
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'suggestion' as 'problem' | 'complaint' | 'suggestion'
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simüle edilmiş form gönderimi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      type: 'suggestion'
    })
    setIsSubmitting(false)
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      
      <main className="relative pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-sm font-semibold shadow-sm backdrop-blur-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  İletişim
                </div>
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Bizimle{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  İletişime Geçin
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Sorularınız, önerileriniz veya sorunlarınız için{' '}
                <span className="font-semibold text-gray-800">her zaman buradayız</span>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
            >
              {/* Contact Information */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    İletişim Bilgileri
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    MetaTalk ekibiyle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {/* Anna */}
                  <Card className="p-6 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Anna</h3>
                        <p className="text-gray-600 mb-4">Proje Lideri</p>
                        <div className="space-y-3">
                          <a
                            href="mailto:annamuratazadov@gmail.com"
                            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                              <Mail className="h-4 w-4" />
                            </div>
                            <span className="text-sm">annamuratazadov@gmail.com</span>
                          </a>
                          <a
                            href="tel:+9054317646276"
                            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                              <Phone className="h-4 w-4" />
                            </div>
                            <span className="text-sm">+90 (543) 76 46 276</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Medet */}
                  <Card className="p-6 border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Medet</h3>
                        <p className="text-gray-600 mb-4">Teknik Ekip Lideri</p>
                        <div className="space-y-3">
                          <a
                            href="mailto:m.medet.sonmez@gmail.com"
                            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors duration-300 group"
                          >
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                              <Mail className="h-4 w-4" />
                            </div>
                            <span className="text-sm">m.medet.sonmez@gmail.com</span>
                          </a>
                          <a
                            href="tel:+905421796834"
                            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors duration-300 group"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                              <Phone className="h-4 w-4" />
                            </div>
                            <span className="text-sm">+90 (542) 179 68 34</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* University Info */}
                  <Card className="p-6 border-0 bg-gradient-to-br from-gray-50 to-slate-50 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">MetaTalk</h3>
                        <p className="text-gray-600 mb-4">İstanbul Medipol Üniversitesi</p>
                        <div className="flex items-center space-x-3 text-gray-700">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <span className="text-sm">İstanbul Medipol Üniversitesi</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <Card className="p-8 border-0 bg-white shadow-xl">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Mesaj Gönder
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Sorun, şikayet veya önerilerinizi bizimle paylaşın.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Message Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Mesaj Türü
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { value: 'problem', label: 'Sorun', icon: AlertTriangle, color: 'red' },
                          { value: 'complaint', label: 'Şikayet', icon: MessageCircle, color: 'orange' },
                          { value: 'suggestion', label: 'Öneri', icon: Lightbulb, color: 'green' }
                        ].map((type) => (
                          <label
                            key={type.value}
                            className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              formData.type === type.value
                                ? `border-${type.color}-500 bg-${type.color}-50`
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="type"
                              value={type.value}
                              checked={formData.type === type.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="flex flex-col items-center space-y-2">
                              <type.icon className={`h-5 w-5 ${
                                formData.type === type.value ? `text-${type.color}-600` : 'text-gray-400'
                              }`} />
                              <span className={`text-sm font-medium ${
                                formData.type === type.value ? `text-${type.color}-700` : 'text-gray-600'
                              }`}>
                                {type.label}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Adınızı ve soyadınızı girin"
                      />
                    </div>

                    {/* Email */}
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="ornek@medipol.edu.tr"
                      />
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Mesajınızın konusu"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mesajınız
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Mesajınızı detaylı bir şekilde yazın..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Gönderiliyor...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>Mesaj Gönder</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

