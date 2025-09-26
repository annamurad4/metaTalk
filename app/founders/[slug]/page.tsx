'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Instagram, 
  Linkedin, 
  ArrowLeft,
  Heart,
  Lightbulb,
  Users,
  Target,
  Code,
  Palette,
  BookOpen,
  Zap
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const foundersData = {
  'annamyrat-azadov': {
    name: "Annamyrat Azadov",
    email: "annamuratazadov@gmail.com",
    instagram: null,
    linkedin: null,
    role: "Kurucu",
    image: "/images/founders/anna.jpg",
    contributions: [
      {
        icon: <Code className="h-6 w-6 text-blue-500" />,
        title: "Teknik Altyapı Geliştirme",
        description: "MetaTalk'ın tüm teknik altyapısını tasarladı ve geliştirdi. Next.js, TypeScript ve Prisma teknolojilerini kullanarak modern ve ölçeklenebilir bir platform oluşturdu."
      },
      {
        icon: <Zap className="h-6 w-6 text-yellow-500" />,
        title: "Proje Mimarisi",
        description: "Platformun temel mimarisini kurdu ve tüm sistem bileşenlerinin entegrasyonunu sağladı. Veritabanı tasarımından API yapısına kadar her detayı planladı."
      },
      {
        icon: <Target className="h-6 w-6 text-green-500" />,
        title: "Performans Optimizasyonu",
        description: "Platformun hızlı ve verimli çalışması için gerekli optimizasyonları yaptı. Kullanıcı deneyimini artıran teknik çözümler geliştirdi."
      }
    ],
    bio: "MetaTalk'ın teknolojik temellerini atan ve platformun tüm teknik altyapısını geliştiren ekip üyesi. Yazılım geliştirme konusundaki uzmanlığı ile projenin başarılı olmasında kritik rol oynadı."
  },
  'muhammed-medet-sonmez': {
    name: "Muhammed Medet Sönmez",
    email: "m.medet.sonmez@gmail.com",
    instagram: "m_medet_sonmez",
    linkedin: "https://www.linkedin.com/in/muhammed-medet-s%C3%B6nmez-73a514386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    role: "Kurucu",
    image: "/images/founders/medet_22.jpg",
    contributions: [
      {
        icon: <Users className="h-6 w-6 text-blue-500" />,
        title: "Kullanıcı Deneyimi",
        description: "Platformun kullanıcı deneyimini şekillendirdi ve kullanıcı ihtiyaçlarını analiz ederek çözümler geliştirdi. Eşleşme sistemi ve etkileşim tasarımında önemli katkılar sağladı."
      },
      {
        icon: <Target className="h-6 w-6 text-green-500" />,
        title: "Strateji Geliştirme",
        description: "Projenin genel stratejisini belirledi ve platformun hedeflerini netleştirdi. Kullanıcı odaklı yaklaşımı ile projenin yönünü şekillendirdi."
      },
      {
        icon: <Heart className="h-6 w-6 text-red-500" />,
        title: "Topluluk Oluşturma",
        description: "Öğrenci topluluğunu bir araya getirme konusunda çalıştı ve platformun sosyal yönünü güçlendirdi. Kullanıcı etkileşimlerini artıran özellikler geliştirdi."
      }
    ],
    bio: "Platformun kullanıcı deneyimi ve stratejisini şekillendiren ekip üyesi. Kullanıcı odaklı yaklaşımı ile MetaTalk'ın başarılı olmasında önemli rol oynadı."
  },
  'elmira-muratova': {
    name: "Elmira Muratova",
    email: "muratowailmira492@gmail.com",
    instagram: "elmira_muratova4",
    linkedin: "https://www.linkedin.com/in/elmira-muratova-176863292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    role: "Kurucu",
    image: "/images/founders/elmira.jpg",
    contributions: [
      {
        icon: <Zap className="h-6 w-6 text-yellow-500" />,
        title: "Girişkenlik ve Liderlik",
        description: "Projeye girişkenliğiyle büyük katkı sağladı. Ekip içi koordinasyonu sağladı ve projenin ilerlemesinde aktif rol oynadı. Motivasyonu yüksek tutarak ekibi yönlendirdi."
      },
      {
        icon: <BookOpen className="h-6 w-6 text-purple-500" />,
        title: "Dil Eğitimi Yaklaşımı",
        description: "Dil eğitimi konusundaki uzmanlığı ile platformun eğitim yaklaşımını belirledi. Öğrencilerin dil öğrenme sürecini optimize eden stratejiler geliştirdi."
      },
      {
        icon: <Users className="h-6 w-6 text-blue-500" />,
        title: "İçerik Stratejisi",
        description: "Platformun içerik stratejisini geliştirdi ve kullanıcıların ihtiyaçlarına uygun içeriklerin oluşturulmasını sağladı. Eğitim materyallerinin kalitesini artırdı."
      }
    ],
    bio: "Girişkenliğiyle projeye büyük katkı sağlayan ve dil eğitimi yaklaşımını belirleyen ekip üyesi. Ekip koordinasyonu ve eğitim stratejisi konularında önemli rol oynadı."
  },
  'sude-koroglu': {
    name: "Sude Köroğlu",
    email: "koroglussude@gmail.com",
    instagram: "koroglusude1",
    linkedin: "https://www.linkedin.com/in/sude-k%C3%B6ro%C4%9Flu-a78290338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    role: "Kurucu",
    image: "/images/founders/sude_1.jpg",
    contributions: [
      {
        icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
        title: "Fikir Geliştirme",
        description: "Projenin temel fikirlerini geliştirdi ve yaratıcı çözümler önerdi. Platformun konseptini şekillendiren önemli fikirlerin sahibi oldu. İnovatif yaklaşımları ile projeyi zenginleştirdi."
      },
      {
        icon: <Palette className="h-6 w-6 text-pink-500" />,
        title: "Görsel Kimlik Tasarımı",
        description: "Platformun görsel kimliğini tasarladı ve kullanıcı arayüzünü geliştirdi. Modern ve kullanıcı dostu tasarım anlayışı ile platformun görsel kalitesini artırdı."
      },
      {
        icon: <Heart className="h-6 w-6 text-red-500" />,
        title: "Kullanıcı Deneyimi",
        description: "Kullanıcı deneyimini iyileştiren tasarım çözümleri geliştirdi. Platformun kullanılabilirliğini artıran özellikler tasarladı ve kullanıcı memnuniyetini ön planda tuttu."
      }
    ],
    bio: "Fikir açısından büyük katkılar sağlayan ve platformun görsel kimliğini tasarlayan ekip üyesi. Yaratıcılığı ve tasarım yeteneği ile projenin başarısında önemli rol oynadı."
  }
}

export default function FounderProfilePage() {
  const params = useParams()
  const slug = params.slug as string
  const founder = foundersData[slug as keyof typeof foundersData]

  if (!founder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kurucu Bulunamadı</h1>
            <p className="text-lg text-gray-600 mb-8">Aradığınız kurucu bulunamadı.</p>
            <Button asChild>
              <Link href="/about">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri Dön
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/about">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Hakkımızda Sayfasına Dön
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <div className="max-w-4xl mx-auto">
                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {founder.name}
                </h1>
                
                <p className="text-xl text-blue-600 font-semibold mb-6">
                  {founder.role}
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                  {founder.bio}
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href={`mailto:${founder.email}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-xl transition-all duration-300"
                    title="E-posta"
                  >
                    <Mail className="h-6 w-6" />
                  </motion.a>
                  
                  {founder.instagram && (
                    <motion.a
                      href={`https://instagram.com/${founder.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-600 rounded-xl transition-all duration-300"
                      title="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </motion.a>
                  )}
                  
                  {founder.linkedin && (
                    <motion.a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-xl transition-all duration-300"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-6 w-6" />
                    </motion.a>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contributions Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Projeye Katkıları
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {founder.name}'ın MetaTalk projesine yaptığı değerli katkılar
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {founder.contributions.map((contribution, index) => (
                <motion.div
                  key={contribution.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                        {contribution.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {contribution.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {contribution.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
