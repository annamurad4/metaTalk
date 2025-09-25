'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Zap,
  Activity,
  TrendingUp,
  Users,
  MessageCircle,
  Video,
  Mail,
  Bell,
  RefreshCw,
  Wifi,
  WifiOff,
  AlertTriangle,
  XCircle,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const StatusPage = () => {
  // Sistem durumu verileri (gerçek uygulamada API'den gelecek)
  const systemStatus = {
    overall: 'operational', // operational, degraded, outage
    uptime: '99.9%',
    responseTime: '45ms',
    lastIncident: '2025-09-15',
    lastUpdate: '15 Ocak 2025, 14:30'
  }

  const services = [
    {
      name: 'Ana Platform',
      status: 'operational',
      description: 'MetaTalk ana uygulaması',
      responseTime: '42ms',
      uptime: '99.95%',
      icon: Globe
    },
    {
      name: 'Kimlik Doğrulama',
      status: 'operational',
      description: 'Kullanıcı giriş ve kayıt sistemi',
      responseTime: '38ms',
      uptime: '99.98%',
      icon: Shield
    },
    {
      name: 'Video Görüşmeler',
      status: 'operational',
      description: 'Canlı video konferans servisi',
      responseTime: '67ms',
      uptime: '99.92%',
      icon: Video
    },
    {
      name: 'E-posta Servisi',
      status: 'operational',
      description: 'Doğrulama ve bildirim e-postaları',
      responseTime: '125ms',
      uptime: '99.89%',
      icon: Mail
    },
    {
      name: 'Veritabanı',
      status: 'operational',
      description: 'Kullanıcı verileri ve oturum bilgileri',
      responseTime: '23ms',
      uptime: '99.99%',
      icon: Database
    },
    {
      name: 'Eşleştirme Sistemi',
      status: 'operational',
      description: 'Kullanıcı eşleştirme algoritması',
      responseTime: '89ms',
      uptime: '99.94%',
      icon: Users
    }
  ]

  const recentIncidents = [
    {
      id: 1,
      title: 'Video görüşme bağlantı sorunu',
      status: 'resolved',
      description: 'Bazı kullanıcılar video görüşmelere katılamıyordu',
      impact: 'minor',
      startTime: '2025-09-15 14:30',
      endTime: '2025-09-15 15:45',
      duration: '1 saat 15 dakika'
    },
    {
      id: 2,
      title: 'E-posta gönderim gecikmesi',
      status: 'resolved',
      description: 'Doğrulama e-postaları gecikmeli geliyordu',
      impact: 'minor',
      startTime: '2025-09-12 09:15',
      endTime: '2025-09-12 10:30',
      duration: '1 saat 15 dakika'
    },
    {
      id: 3,
      title: 'Yüksek trafik nedeniyle yavaşlama',
      status: 'resolved',
      description: 'Yoğun kullanım nedeniyle sistem yanıt süreleri arttı',
      impact: 'major',
      startTime: '2025-09-10 16:00',
      endTime: '2025-09-10 18:30',
      duration: '2 saat 30 dakika'
    }
  ]

  const performanceMetrics = [
    {
      name: 'Ortalama Yanıt Süresi',
      value: '45ms',
      change: '+2ms',
      trend: 'up',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      name: 'Sistem Performansı',
      value: '98.5%',
      change: '+1.2%',
      trend: 'up',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      name: 'Başarılı Görüşmeler',
      value: '98.7%',
      change: '+0.3%',
      trend: 'up',
      icon: Video,
      color: 'text-purple-600'
    },
    {
      name: 'Sistem Kullanılabilirliği',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-600'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100'
      case 'degraded': return 'text-yellow-600 bg-yellow-100'
      case 'outage': return 'text-red-600 bg-red-100'
      case 'resolved': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle
      case 'degraded': return AlertCircle
      case 'outage': return XCircle
      case 'resolved': return CheckCircle
      default: return Info
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'minor': return 'bg-blue-100 text-blue-800'
      case 'major': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-white/10 to-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-white/10 to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto pt-20"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold shadow-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <Activity className="h-4 w-4 mr-2" />
                  Sistem Durumu
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight"
              >
                MetaTalk{' '}
                <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Durum Merkezi
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Tüm sistemlerimizin durumunu, performans metriklerini ve son güncellemeleri{' '}
                <span className="font-semibold text-white">gerçek zamanlı</span> olarak takip edin.
              </motion.p>

              {/* Overall Status */}
              <motion.div variants={itemVariants} className="flex justify-center mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <CheckCircle className="h-12 w-12 text-green-400" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">Tüm Sistemler Çalışıyor</h3>
                      <p className="text-blue-100">Son güncelleme: {systemStatus.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-blue-100 text-sm">Sistem Kullanılabilirliği</p>
                      <p className="text-3xl font-bold text-white">{systemStatus.uptime}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-blue-100 text-sm">Ortalama Yanıt Süresi</p>
                      <p className="text-3xl font-bold text-white">{systemStatus.responseTime}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Status */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-700 text-sm font-semibold shadow-sm backdrop-blur-sm">
                  <Server className="h-4 w-4 mr-2" />
                  Servis Durumları
                </div>
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Tüm{' '}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Servisler
                </span>{' '}
                Aktif
              </motion.h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => {
                const StatusIcon = getStatusIcon(service.status)
                const ServiceIcon = service.icon
                
                return (
                  <motion.div key={service.name} variants={itemVariants}>
                    <Card className="h-full hover:shadow-2xl transition-all duration-500 group cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                      <CardHeader className="pb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                            <ServiceIcon className="h-8 w-8 text-blue-600" />
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon className="h-6 w-6 text-green-600" />
                            <Badge className={getStatusColor(service.status)}>
                              {service.status === 'operational' ? 'Aktif' : service.status}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500">Yanıt Süresi</p>
                            <p className="text-lg font-bold text-gray-900">{service.responseTime}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500">Kullanılabilirlik</p>
                            <p className="text-lg font-bold text-gray-900">{service.uptime}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-16 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50 text-purple-700 text-sm font-semibold shadow-sm backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Performans Metrikleri
                </div>
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Gerçek Zamanlı{' '}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  İstatistikler
                </span>
              </motion.h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {performanceMetrics.map((metric, index) => {
                const MetricIcon = metric.icon
                
                return (
                  <motion.div key={metric.name} variants={itemVariants}>
                    <Card className="h-full hover:shadow-2xl transition-all duration-500 group cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                          <MetricIcon className={`h-8 w-8 ${metric.color}`} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {metric.name}
                        </h3>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {metric.value}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">
                            {metric.change}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 text-orange-700 text-sm font-semibold shadow-sm backdrop-blur-sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Son Olaylar
                </div>
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight"
              >
                Sistem{' '}
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  Olayları
                </span>
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Son dönemde yaşanan sistem olayları ve çözüm süreçleri
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {recentIncidents.map((incident, index) => (
                <motion.div key={incident.id} variants={itemVariants}>
                  <Card className="hover:shadow-2xl transition-all duration-500 group cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-1">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                            <Badge className={getImpactColor(incident.impact)}>
                              {incident.impact === 'minor' ? 'Düşük Etki' : 
                               incident.impact === 'major' ? 'Yüksek Etki' : 
                               incident.impact === 'critical' ? 'Kritik Etki' : incident.impact}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              Çözüldü
                            </Badge>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {incident.title}
                          </h3>
                          <p className="text-gray-600 text-lg mb-4">
                            {incident.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                            <div>
                              <p className="font-medium">Başlangıç:</p>
                              <p>{incident.startTime}</p>
                            </div>
                            <div>
                              <p className="font-medium">Bitiş:</p>
                              <p>{incident.endTime}</p>
                            </div>
                            <div>
                              <p className="font-medium">Süre:</p>
                              <p className="text-orange-600 font-semibold">{incident.duration}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold shadow-lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Yardıma mı İhtiyacınız Var?
                </div>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight"
              >
                Sorun mu{' '}
                <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Yaşıyorsunuz?
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Sistem durumu hakkında sorularınız varsa veya bir sorun yaşıyorsanız,{' '}
                <span className="font-semibold text-white">7/24 destek</span> ekibimizle iletişime geçin.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
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
                      <RefreshCw className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
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

export default StatusPage
