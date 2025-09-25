'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { ArrowRight, Play, Users, Globe, MessageCircle, Video } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const HeroSection = () => {
  const [me, setMe] = useState<{ id: string; email: string; name: string | null; surname: string | null; avatar_url: string | null } | null>(null)

  useEffect(() => {
    // Sayfa yüklenince kimlik bilgisini çek
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((res) => {
        if (res?.success) {
          setMe(res.data)
        }
      })
      .catch(() => {})
  }, [])

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 z-10">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Gradient Orbs - Temporarily disabled to fix text overlap */}
        {/* <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div> */}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f1f5f9%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-indigo-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto pt-20"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-sm font-semibold shadow-sm backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <Globe className="h-4 w-4 mr-2" />
              Sadece Medipol öğrencileri için özel platform
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight relative z-50"
          >
            {me ? (
              <>
                <span className="block">Hoş Geldin,</span>
                <span className="block">{me.name || 'Öğrenci'}!</span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1">
                  Hemen Başla
                </span>
              </>
            ) : (
              <>
                <span className="block">Dil Pratiği</span>
                <span className="block">Yapmanın</span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1">
                  En Kolay Yolu
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            {me ? (
              <>
                Dil pratiği yapmaya hazır mısın?{' '}
                <span className="font-semibold text-gray-800">Öğrenmek</span> veya{' '}
                <span className="font-semibold text-gray-800">öğretmek</span> için eşleşme bul!
                <br className="hidden sm:block" />
                <span className="font-semibold text-gray-800">Medipol öğrencileriyle</span> güvenli görüşmeler yap.
              </>
            ) : (
              <>
                MetaTalk ile aynı üniversiteden öğrencilerle{' '}
                <span className="font-semibold text-gray-800">güvenli bir şekilde</span> dil pratiği yapın. 
                <br className="hidden sm:block" />
                <span className="font-semibold text-gray-800">Yüz yüze görüşmeler</span> yapın ve dil becerilerinizi geliştirin.
              </>
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          >
            {me ? (
              // Giriş yapmış kullanıcılar için
              <Button
                size="xl"
                variant="gradient"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                asChild
              >
                <Link href="/matching">
                  <span className="relative z-10 flex items-center">
                    <Users className="mr-3 h-6 w-6" />
                    Eşleşme Bul
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </Button>
            ) : (
              // Giriş yapmamış kullanıcılar için
              <>
                <Button
                  size="xl"
                  variant="gradient"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="/auth/register">
                    <span className="relative z-10 flex items-center">
                      Hemen Başla
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                
                <Button
                  size="xl"
                  variant="outline"
                  className="group relative bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="#how-it-works">
                    <span className="flex items-center">
                      <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      Nasıl Çalışır?
                    </span>
                  </Link>
                </Button>
              </>
            )}
          </motion.div>

        </motion.div>

        {/* Subtle Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 right-20 hidden lg:block"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-2xl flex items-center justify-center shadow-sm backdrop-blur-sm border border-white/30">
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-32 left-16 hidden lg:block"
          style={{ animationDelay: '2s' }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-100/50 to-emerald-100/50 rounded-2xl flex items-center justify-center shadow-sm backdrop-blur-sm border border-white/30">
            <Globe className="h-10 w-10 text-green-500" />
          </div>
        </motion.div>
      </div>

    </section>
  )
}

export { HeroSection }
