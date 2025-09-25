'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Mail, 
  Instagram, 
  Linkedin, 
  Users, 
  Heart, 
  Lightbulb, 
  Target,
  ArrowRight,
  Quote,
  GraduationCap,
  Globe,
  Code,
  Sparkles
} from 'lucide-react'
import Image from 'next/image'

const founders = [
  {
    name: "Annamyrat Azadov",
    email: "annamuratazadov@gmail.com",
    instagram: null,
    linkedin: null,
    role: "Kurucu",
    slug: "annamyrat-azadov"
  },
  {
    name: "Elmira Muratova",
    email: "elmira.muratova@std.medipol.edu.tr",
    instagram: "elmira_muratova4",
    linkedin: "https://www.linkedin.com/in/elmira-muratova-176863292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    role: "Kurucu",
    slug: "elmira-muratova"
  },
  {
    name: "Muhammed Medet Sönmez",
    email: "m.medet.sonmez@gmail.com",
    instagram: "m_medet_sonmez",
    linkedin: "https://www.linkedin.com/in/muhammed-medet-s%C3%B6nmez-73a514386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    role: "Kurucu",
    slug: "muhammed-medet-sonmez"
  },
  {
    name: "Sude Köroğlu",
    email: "koroglussude@gmail.com",
    instagram: "koroglusude1",
    linkedin: "https://www.linkedin.com/in/sude-k%C3%B6ro%C4%9Flu-a78290338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    role: "Kurucu",
    slug: "sude-koroglu"
  }
]

const values = [
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "Tutku",
    description: "Dil öğrenme tutkusunu teknoloji ile birleştirerek, öğrencilerin hayallerini gerçekleştirmelerine yardımcı oluyoruz."
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
    title: "İnovasyon",
    description: "Geleneksel dil eğitimi yöntemlerini yenilikçi teknolojilerle dönüştürüyor, öğrenme deneyimini zenginleştiriyoruz."
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Topluluk",
    description: "Öğrenciler arasında güçlü bağlar kurarak, birlikte öğrenme ve gelişme kültürünü destekliyoruz."
  },
  {
    icon: <Target className="h-8 w-8 text-green-500" />,
    title: "Hedef Odaklı",
    description: "Her öğrencinin dil hedeflerine ulaşması için kişiselleştirilmiş çözümler sunuyoruz."
  }
]

const stats = [
  { number: "4", label: "Kurucu Üye", icon: <Users className="h-6 w-6" /> },
  { number: "1", label: "Üniversite", icon: <GraduationCap className="h-6 w-6" /> },
  { number: "∞", label: "Hedef", icon: <Target className="h-6 w-6" /> },
  { number: "100%", label: "Tutku", icon: <Heart className="h-6 w-6" /> }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-8 shadow-xl"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Hakkımızda
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              MetaTalk'ın hikayesi ve vizyonu
            </motion.p>
          </motion.div>

          {/* Main Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start mb-8">
                  <Quote className="h-12 w-12 text-blue-500 mr-4 flex-shrink-0 mt-2" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Bizim Hikayemiz
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      MetaTalk, İstanbul Medipol Üniversitesi öğrencilerinin ortak bir tutkuyla hayata geçirdiği bir projedir. Başlangıçta bir arkadaş grubunun fikir alışverişleriyle şekillenen bu girişim, zamanla her birimizin uzmanlık alanlarını bir araya getiren sistematik bir çalışmaya dönüştü. En güçlü yönlerimizi kullanarak geliştirdiğimiz MetaTalk, teknolojiyi ve dil eğitimini yenilikçi bir yaklaşımla birleştirir. Bu platform, bireysel yeteneklerin bir takım çalışmasıyla nasıl güçlü bir ürüne dönüşebileceğinin somut bir örneğidir.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Değerlerimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                MetaTalk'ı şekillendiren temel değerler ve yaklaşımımız
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="flex justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Founders Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Kurucu Ekibimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                MetaTalk'ı hayata geçiren tutkulu ekip üyelerimiz
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {founders.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  className="flex"
                >
                  <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 flex flex-col w-full">
                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                      {founder.name === "Annamyrat Azadov" ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <Image
                            src="/images/founders/anna.jpg"
                            alt={founder.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : founder.name === "Muhammed Medet Sönmez" ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <Image
                            src="/images/founders/medet_22.jpg"
                            alt={founder.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : founder.name === "Sude Köroğlu" ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <Image
                            src="/images/founders/sude_1.jpg"
                            alt={founder.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                              {founder.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {founder.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium mb-4">
                        {founder.role}
                      </p>
                      
                      {/* Profile Button */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                          asChild
                        >
                          <Link href={`/founders/${founder.slug}`}>
                            Profili Görüntüle
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex justify-center space-x-3 mt-auto">
                      <motion.a
                        href={`mailto:${founder.email}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-all duration-300"
                        title="E-posta"
                      >
                        <Mail className="h-4 w-4" />
                      </motion.a>
                      
                      {founder.instagram && (
                        <motion.a
                          href={`https://instagram.com/${founder.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-600 rounded-lg transition-all duration-300"
                          title="Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                        </motion.a>
                      )}
                      
                      {founder.linkedin && (
                        <motion.a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-all duration-300"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </motion.a>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">
                MetaTalk'a Katılın
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Dil öğrenme yolculuğunuzda bize katılın ve dünyanın dört bir yanından öğrencilerle pratik yapın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/auth/register"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                >
                  Hemen Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.a>
                <motion.a
                  href="/matching"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Eşleşme Bul
                  <Users className="ml-2 h-5 w-5" />
                </motion.a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
