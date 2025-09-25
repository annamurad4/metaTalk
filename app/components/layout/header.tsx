'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { Menu, X, User, LogIn, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className }, ref) => {
    const [me, setMe] = useState<{ id: string; email: string; name: string | null; surname: string | null; avatar_url: string | null } | null>(null)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

    const navItems = [
      { name: 'Ana Sayfa', href: '/' },
      { name: 'Nasıl Çalışır', href: '#how-it-works' },
      { name: 'Özellikler', href: '#features' },
      { name: 'Hakkımızda', href: '/about' },
    ]

    return (
      <motion.header
        ref={ref}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50'
            : 'bg-transparent',
          className
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white font-bold text-xl">M</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                  MetaTalk
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {me ? (
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300" asChild>
                    <Link href="/profile" prefetch={true}>
                      <User className="h-4 w-4 mr-2" />
                      Profil
                    </Link>
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300" asChild>
                    <Link href="/auth/login" prefetch={true}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Giriş Yap
                    </Link>
                  </Button>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <Button variant="outline" size="sm" className="border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors duration-300" asChild>
                  <Link href="/matching" prefetch={true}>
                    <Users className="h-4 w-4 mr-2" />
                    Eşleşme Bul
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {me ? (
                  <Button variant="gradient" size="sm" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                    <Link href="/api/auth/logout" prefetch={false}>
                      Çıkış Yap
                    </Link>
                  </Button>
                ) : (
                  <Button variant="gradient" size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                    <Link href="/auth/register" prefetch={true}>
                      <User className="h-4 w-4 mr-2" />
                      Kayıt Ol
                    </Link>
                  </Button>
                )}
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menüyü aç/kapat"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-6 space-y-2 border-t border-gray-200/50">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0, 
                    x: isMenuOpen ? 0 : -20 
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="px-6 pt-6 space-y-3 border-t border-gray-200/50">
                {me ? (
                  <>
                    <Button variant="ghost" size="sm" fullWidth className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300" asChild>
                      <Link href="/profile" prefetch={true} onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Profil
                      </Link>
                    </Button>
                    <form action="/api/auth/logout" method="POST" onSubmit={() => setIsMenuOpen(false)}>
                      <Button variant="gradient" size="sm" fullWidth type="submit" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                        Çıkış Yap
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" fullWidth className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300" asChild>
                      <Link href="/auth/login" prefetch={true} onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Giriş Yap
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" fullWidth className="border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors duration-300" asChild>
                      <Link href="/matching" prefetch={true} onClick={() => setIsMenuOpen(false)}>
                        <Users className="h-4 w-4 mr-2" />
                        Eşleşme Bul
                      </Link>
                    </Button>
                    <Button variant="gradient" size="sm" fullWidth className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                      <Link href="/auth/register" prefetch={true} onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Kayıt Ol
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>
    )
  }
)
Header.displayName = 'Header'

export { Header }
