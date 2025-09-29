'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui'
import { 
  UserPlus, 
  Search, 
  Video, 
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react'
import Link from 'next/link'

const HowItWorksSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const steps = [
    {
      step: '01',
      icon: UserPlus,
      title: 'Hesap Oluştur',
      description: 'Medipol e-posta adresinizle hızlıca kayıt olun. 4 haneli kod ile doğrulama yapın.',
      details: [
        'Medipol e-posta doğrulaması',
        'Profil bilgilerinizi doldurun',
        'Öğrenmek istediğiniz dilleri seçin',
        'Seviyenizi belirleyin'
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      step: '02',
      icon: Search,
      title: 'Eşleşme Bul',
      description: 'Size uygun dil partnerini bulun. Filtreler ile arama yapın ve eşleşme isteği gönderin.',
      details: [
        'Dil ve seviye filtreleme',
        'Profil kartlarını inceleyin',
        'Eşleşme isteği gönderin',
        'Onay bekleyin'
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      step: '03',
      icon: Video,
      title: 'Görüşme Yap',
      description: 'Güvenli video görüşmesi yapın. Maksimum 1 saat süreyle pratik yapın.',
      details: [
        'Video odasına katılın',
        'Kamera ve mikrofon ayarları',
        'Dil pratiği yapın',
        'Ekran paylaşımı kullanın'
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      step: '04',
      icon: Star,
      title: 'Değerlendir',
      description: 'Görüşme sonrası karşılıklı puanlama yapın. Deneyiminizi paylaşın.',
      details: [
        '1-5 yıldız puanlama',
        'Geri bildirim yazın',
        'Deneyimi değerlendirin',
        'Gelecek için not alın'
      ],
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const benefits = [
    {
      icon: Clock,
      title: 'Hızlı Başlangıç',
      description: '5 dakikada hesap oluşturun ve hemen başlayın'
    },
    {
      icon: Users,
      title: 'Güvenli Ortam',
      description: 'Sadece Medipol öğrencileri ile eşleşin'
    },
    {
      icon: CheckCircle,
      title: 'Kolay Kullanım',
      description: 'Sezgisel arayüz ile kolayca navigasyon'
    },
  ]

  return (
    <section id="how-it-works" className="py-12 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-700 text-sm font-semibold shadow-sm backdrop-blur-sm">
              <Clock className="h-4 w-4 mr-2" />
              Nasıl Çalışır?
            </div>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            4 Adımda{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Başlayın
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            MetaTalk ile dil pratiği yapmak çok kolay. Sadece birkaç adımda{' '}
            <span className="font-semibold text-gray-800">aynı üniversiteden öğrencilerle</span> görüşmeye başlayın.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-16 mb-24"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader className="pb-8">
                    <div className="flex items-center gap-6 mb-6">
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {step.step}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>
                      </div>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-6">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-600 mb-8 leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-4">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-gray-700 text-lg">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <div className={`w-full h-80 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center relative overflow-hidden shadow-2xl group`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
                  
                  <div className="relative z-10 text-center text-white">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <step.icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-white/90 text-base max-w-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Enhanced decorative elements */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-6 w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute top-1/3 right-8 w-4 h-4 bg-white/20 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: '3s' }}></div>
                </div>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full shadow-xl flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-white rotate-90" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative bg-white rounded-3xl p-12 sm:p-16 shadow-2xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e0f2fe%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          
          <motion.div variants={itemVariants} className="text-center mb-16 relative z-10">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Neden{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MetaTalk
              </span>{' '}
              Tercih Edilmeli?
            </h3>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Dil öğrenme sürecinizi hızlandıran özellikler
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 relative z-10"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center relative z-10">
            <Button size="xl" variant="gradient" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" asChild>
              <Link href="/auth/register">
                <span className="flex items-center">
                  Hemen Başla
                  <ArrowRight className="ml-3 h-6 w-6" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export { HowItWorksSection }
