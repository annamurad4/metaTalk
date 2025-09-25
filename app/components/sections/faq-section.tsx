'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const faqs = [
    {
      question: "MetaTalk nedir ve nasıl çalışır?",
      answer: "MetaTalk, İstanbul Medipol Üniversitesi öğrencileri için özel olarak tasarlanmış bir dil pratiği platformudur. Aynı üniversiteden öğrencilerle eşleşerek güvenli bir ortamda dil pratiği yapabilirsiniz. Kayıt olduktan sonra profil oluşturur, dil seviyenizi belirtir ve size uygun eşleşmeler bulursunuz."
    },
    {
      question: "Kimler MetaTalk'ı kullanabilir?",
      answer: "MetaTalk sadece İstanbul Medipol Üniversitesi öğrencileri için tasarlanmıştır. @std.medipol.edu.tr e-posta adresi ile kayıt olabilirsiniz. Bu sayede güvenli ve kontrollü bir ortam sağlanır."
    },
    {
      question: "Dil pratiği nasıl yapılıyor?",
      answer: "Eşleşme bulduktan sonra video görüşmesi yaparak dil pratiği gerçekleştirirsiniz. Görüşme süresi maksimum 1 saattir. Görüşme öncesi ve sonrası mesajlaşma özelliği de bulunmaktadır."
    },
    {
      question: "Güvenlik ve gizlilik nasıl sağlanıyor?",
      answer: "Tüm kullanıcılar üniversite e-posta adresi ile doğrulanır. Kişisel bilgileriniz korunur ve istediğiniz zaman görüşmeyi sonlandırabilirsiniz. Puanlama sistemi ile kaliteli deneyim sağlanır."
    },
    {
      question: "Hangi dillerde pratik yapabilirim?",
      answer: "Platform 15+ dil desteği sunar. İngilizce, Almanca, Fransızca, İspanyolca, Arapça gibi popüler dillerin yanı sıra diğer dillerde de pratik yapabilirsiniz."
    },
    {
      question: "Ücretli mi?",
      answer: "MetaTalk tamamen ücretsizdir! Hiçbir ücret ödemeden kayıt olabilir ve dil pratiği yapabilirsiniz."
    },
    {
      question: "Teknik sorun yaşarsam ne yapmalıyım?",
      answer: "Teknik sorunlar için info@metatalk.tr adresine e-posta gönderebilir veya +90 (543) 76 46 276 numarasını arayabilirsiniz. Yardım ekibimiz size en kısa sürede dönüş yapacaktır."
    },
    {
      question: "Nasıl kayıt olabilirim?",
      answer: "Ana sayfadaki 'Ücretsiz Kayıt Ol' butonuna tıklayarak kayıt olabilirsiniz. @std.medipol.edu.tr e-posta adresinizle kayıt olduktan sonra e-posta doğrulaması yapmanız gerekecek."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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
    <section id="faq" className="py-16 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-700 text-sm font-semibold shadow-sm backdrop-blur-sm mb-6">
              <HelpCircle className="h-4 w-4 mr-2" />
              Sık Sorulan Sorular
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Sorularınızın{' '}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Cevapları
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              MetaTalk hakkında merak ettiğiniz her şeyi{' '}
              <span className="font-semibold text-gray-800">burada bulabilirsiniz</span>
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div variants={itemVariants} className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-300 group"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4 group-hover:text-green-600 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-green-600 transition-colors duration-300" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Sorunuz mu var?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Aradığınız cevabı bulamadınız mı? Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:info@metatalk.tr"
                  className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-300"
                >
                  E-posta Gönder
                </a>
                <a
                  href="tel:+905437646276"
                  className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Telefon Et
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export { FAQSection }

