'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  HelpCircle, 
  Search,
  MessageCircle,
  Mail, 
  Phone, 
  User,
  Building,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Shield,
  Video,
  Globe,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Lock,
  Eye,
  Heart
} from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
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

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Başlangıç',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      articles: [
        {
          title: 'MetaTalk nedir ve nasıl çalışır?',
          content: 'MetaTalk, Medipol Üniversitesi öğrencilerini bir araya getiren bir dil pratiği platformudur. Kayıt olduktan sonra, öğrenmek istediğiniz dilleri ve seviyenizi belirleyerek diğer öğrencilerle eşleşebilir, güvenli video görüşmeleri yaparak dil becerilerinizi geliştirebilirsiniz.'
        },
        {
          title: 'Nasıl kayıt olabilirim?',
          content: 'Ana sayfadaki "Hemen Başla" veya "Ücretsiz Kayıt Ol" butonlarına tıklayarak kayıt sürecini başlatabilirsiniz. Medipol e-posta adresinizle hızlıca bir hesap oluşturabilirsiniz.'
        },
        {
          title: 'Kimler MetaTalk kullanabilir?',
          content: 'MetaTalk, sadece Medipol Üniversitesi öğrencileri için tasarlanmıştır. Kayıt sırasında Medipol e-posta adresinizle kimlik doğrulaması yapmanız gerekmektedir.'
        },
        {
          title: 'MetaTalk ücretli mi?',
          content: 'Hayır, MetaTalk Medipol Üniversitesi öğrencileri için tamamen ücretsizdir. Dil pratiği yaparken herhangi bir ücret ödemeniz gerekmez.'
        }
      ]
    },
    {
      id: 'account-profile',
      title: 'Hesap ve Profil',
      icon: User,
      color: 'from-green-500 to-green-600',
      articles: [
        {
          title: 'E-posta doğrulaması nasıl yapılır?',
          content: 'Kayıt olduktan sonra e-posta adresinize 4 haneli bir doğrulama kodu gönderilir. Bu kodu platform üzerinden girerek hesabınızı aktifleştirebilirsiniz. Kod 5 dakika geçerlidir.'
        },
        {
          title: 'Profil bilgilerimi nasıl düzenleyebilirim?',
          content: 'Giriş yaptıktan sonra profil sayfanızdan kişisel bilgilerinizi, öğrenmek istediğiniz dilleri ve seviyelerinizi düzenleyebilirsiniz.'
        },
        {
          title: 'Şifremi unuttum, ne yapmalıyım?',
          content: 'Giriş sayfasında "Şifremi Unuttum" linkine tıklayarak e-posta adresinize şifre sıfırlama bağlantısı gönderebilirsiniz.'
        },
        {
          title: 'Hesabımı nasıl silebilirim?',
          content: 'Hesap silme işlemi için lütfen destek ekibimizle iletişime geçin. Kişisel verileriniz güvenli bir şekilde silinecektir.'
        }
      ]
    },
    {
      id: 'matching-sessions',
      title: 'Eşleştirme ve Görüşmeler',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      articles: [
        {
          title: 'Nasıl eşleşme bulabilirim?',
          content: 'Profilinizde belirttiğiniz öğrenmek istediğiniz diller ve seviyeler doğrultusunda sistem sizi uygun öğrencilerle eşleştirir. Manuel olarak da arama yapabilirsiniz.'
        },
        {
          title: 'Görüşme nasıl yapılır?',
          content: 'Eşleştiğiniz öğrencilerle platform üzerinden güvenli video görüşmeleri yapabilirsiniz. Görüşmeler maksimum 1 saat sürer ve ekran paylaşımı gibi özellikler mevcuttur.'
        },
        {
          title: 'Görüşme sırasında sorun yaşarsam ne yapmalıyım?',
          content: 'Teknik sorunlar yaşamanız durumunda görüşmeyi sonlandırabilir ve destek ekibimizle iletişime geçebilirsiniz. Alternatif olarak görüşmeyi yeniden başlatabilirsiniz.'
        },
        {
          title: 'Puanlama sistemi nasıl çalışır?',
          content: 'Görüşme sonrası karşılıklı olarak 1-5 yıldız puanı verebilir ve geri bildirim bırakabilirsiniz. Bu puanlar gelecekteki eşleştirmelerde dikkate alınır.'
        }
      ]
    },
    {
      id: 'privacy-security',
      title: 'Gizlilik ve Güvenlik',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      articles: [
        {
          title: 'Kişisel bilgilerim güvende mi?',
          content: 'Kişisel bilgileriniz MetaTalk tarafından korunmaktadır. Tüm verileriniz güvenli sunucularda saklanır ve üçüncü taraflarla paylaşılmaz.'
        },
        {
          title: 'Görüşmeler kaydediliyor mu?',
          content: 'Hayır, görüşmeleriniz kaydedilmez. Tüm görüşmeler gerçek zamanlı olarak yapılır ve hiçbir şekilde saklanmaz.'
        },
        {
          title: 'Rahatsız edici bir kullanıcı varsa ne yapmalıyım?',
          content: 'Herhangi bir rahatsızlık yaşamanız durumunda kullanıcıyı engelleyebilir ve durumu bize rapor edebilirsiniz. Gerekli önlemler alınacaktır.'
        },
        {
          title: 'Verilerim KVKK kapsamında nasıl korunuyor?',
          content: 'Tüm kişisel verileriniz KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında işlenir ve korunur. Detaylı bilgi için gizlilik politikamızı inceleyebilirsiniz.'
        }
      ]
    },
    {
      id: 'technical-support',
      title: 'Teknik Destek',
      icon: Settings,
      color: 'from-orange-500 to-orange-600',
      articles: [
        {
          title: 'Hangi tarayıcılar destekleniyor?',
          content: 'MetaTalk Chrome, Firefox, Safari ve Edge tarayıcılarının güncel sürümlerinde sorunsuz çalışır. En iyi deneyim için Chrome kullanmanızı öneririz.'
        },
        {
          title: 'Mobil cihazlarda kullanabilir miyim?',
          content: 'Evet, MetaTalk mobil cihazlarda da kullanılabilir. Responsive tasarım sayesinde tüm ekran boyutlarında optimum deneyim sunar.'
        },
        {
          title: 'Ses ve görüntü sorunları nasıl çözülür?',
          content: 'Tarayıcınızın mikrofon ve kamera izinlerini kontrol edin. Donanım sorunları için cihazınızın ayarlarını kontrol edebilir veya farklı bir cihaz deneyebilirsiniz.'
        },
        {
          title: 'Site yavaş yükleniyor, ne yapmalıyım?',
          content: 'İnternet bağlantınızı kontrol edin. Sorun devam ederse tarayıcı önbelleğini temizleyin veya farklı bir tarayıcı deneyin.'
        }
      ]
    }
  ]

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

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
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Yardım Merkezi
                </div>
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Size Nasıl{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Yardımcı Olabiliriz?
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-8"
              >
                MetaTalk hakkında merak ettikleriniz, sorunlarınız ve önerileriniz için{' '}
                <span className="font-semibold text-gray-800">buradayız</span>
              </motion.p>

              {/* Search Bar */}
              <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Yardım merkezinde ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Hızlı İletişim
                </h2>
                <p className="text-gray-600 text-lg">
                  Aradığınızı bulamadınız mı? Doğrudan bizimle iletişime geçin.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
              >
                {/* Anna */}
                <Card className="p-6 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Anna</h3>
                      <p className="text-gray-600">Proje Lideri</p>
                    </div>
                  </div>
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
                </Card>

                {/* Medet */}
                <Card className="p-6 border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Medet</h3>
                      <p className="text-gray-600">Teknik Ekip Lideri</p>
                    </div>
                  </div>
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
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Help Sections */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Sıkça Sorulan Sorular
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  MetaTalk hakkında en çok merak edilen konular ve detaylı cevapları
                </p>
              </motion.div>

              <div className="space-y-6">
                {filteredSections.map((section) => (
                  <motion.div
                    key={section.id}
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <button
                      className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors duration-300"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}>
                            <section.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {section.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {section.articles.length} makale
                            </p>
                          </div>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{ rotate: expandedSection === section.id ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight className="h-6 w-6 text-gray-500" />
                        </motion.div>
                      </div>
                    </button>
                    
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedSection === section.id ? 'auto' : 0,
                        opacity: expandedSection === section.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 border-t border-gray-100">
                        <div className="pt-6 space-y-6">
                          {section.articles.map((article, index) => (
                            <div key={index} className="border-l-4 border-blue-200 pl-6">
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                {article.title}
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                {article.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {filteredSections.length === 0 && (
                <motion.div variants={itemVariants} className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Arama sonucu bulunamadı
                  </h3>
                  <p className="text-gray-600 mb-6">
                    "{searchQuery}" için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.
                  </p>
                  <Button
                    onClick={() => setSearchQuery('')}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Aramayı Temizle
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
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
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Hala Yardıma İhtiyacınız Var mı?
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
                className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-light mb-12"
              >
                Sorularınız, önerileriniz veya teknik destek ihtiyaçlarınız için{' '}
                <span className="font-semibold text-white">her zaman buradayız</span>
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="xl" variant="glass" className="group relative overflow-hidden bg-white text-blue-700 hover:bg-white/95 px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2" asChild>
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      <MessageCircle className="mr-3 h-6 w-6" />
                      İletişime Geç
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
