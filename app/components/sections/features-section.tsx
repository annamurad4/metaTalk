'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { 
  Users, 
  Shield, 
  Video, 
  Globe, 
  MessageCircle, 
  Star,
  Clock,
  CheckCircle,
  Zap,
  Heart
} from 'lucide-react'

const FeaturesSection = () => {
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

  const features = [
    {
      icon: Users,
      title: 'Güvenli Eşleştirme',
      description: 'Sadece Medipol Üniversitesi öğrencileri ile eşleşin. Kimlik doğrulama ile güvenli ortam.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Video,
      title: 'Yüz Yüze Görüşme',
      description: 'HD kalitede video görüşmeleri yapın. Ekran paylaşımı ve sohbet özellikleri.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Globe,
      title: '15+ Dil Desteği',
      description: 'İngilizce, Almanca, Fransızca ve daha fazlası. CEFR seviyelerine göre eşleştirme.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MessageCircle,
      title: 'Anlık Mesajlaşma',
      description: 'Görüşme öncesi ve sonrası mesajlaşma. Dosya paylaşımı ve emoji desteği.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Star,
      title: 'Puanlama Sistemi',
      description: 'Görüşme sonrası karşılıklı puanlama. Kaliteli deneyim için feedback sistemi.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Shield,
      title: 'Gizlilik Odaklı',
      description: 'Kişisel bilgileriniz korunur. İstediğiniz zaman görüşmeyi sonlandırabilirsiniz.',
      color: 'from-red-500 to-red-600',
    },
  ]


  return (
    <section id="features" className="py-12 bg-gradient-to-b from-white to-gray-50/50 relative z-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-sm font-semibold shadow-sm backdrop-blur-sm">
              <Zap className="h-4 w-4 mr-2" />
              Özellikler
            </div>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            Neden{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MetaTalk?
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Dil öğrenme sürecinizi hızlandıran, <span className="font-semibold text-gray-800">güvenli ve etkili</span> bir platform. 
            <br className="hidden sm:block" />
            Aynı üniversiteden öğrencilerle pratik yapın, becerilerinizi geliştirin.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card 
                className="h-full hover:shadow-2xl transition-all duration-500 group cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
                hover
              >
                <CardHeader className="text-center pb-6">
                  <div className={`relative w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export { FeaturesSection }
