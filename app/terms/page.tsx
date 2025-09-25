import { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kullanım Şartları | MetaTalk',
  description: 'MetaTalk Platformu Kullanım Şartları - Platform kullanımına ilişkin koşulları ve kuralları öğrenin.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kullanım Şartları
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bu Kullanım Şartları, İstanbul Medipol Üniversitesi öğrencileri için kurulmuş olan 
              Metatalk Platformu'nun kullanımına ilişkin koşulları düzenler.
            </p>
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Güncelleme Tarihi: 30.09.2025
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* 1. Giriş */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
                Giriş
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Bu Kullanım Şartları, İstanbul Medipol Üniversitesi öğrencileri için kurulmuş olan 
                  Metatalk Platformu'nun kullanımına ilişkin koşulları düzenler. Platforma üye olan 
                  her kullanıcı, bu şartları kabul etmiş sayılır.
                </p>
              </div>
            </Card>

            {/* 2. Üyelik Koşulları */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
                Üyelik Koşulları
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">✓</span>
                    <span>Metatalk Platformu'na yalnızca İstanbul Medipol Üniversitesi öğrencileri katılabilir.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">✓</span>
                    <span>Üyelik için okul e-posta adresi ile kayıt olunması zorunludur.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">❌</span>
                    <span>Yanıltıcı, sahte veya başkasına ait bilgilerle yapılan kayıtlar geçersizdir ve yönetim tarafından derhal iptal edilebilir.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 3. Kullanıcı Yükümlülükleri */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
                Kullanıcı Yükümlülükleri
              </h2>
              <div className="space-y-6 text-gray-700">
                <p>
                  Kullanıcılar, platformu yalnızca amacına uygun (dil eşleşmesi, kulüp etkinlikleri ve iletişim) 
                  şekilde kullanmayı kabul eder.
                </p>
                
                <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">Yasak Davranışlar</h3>
                  <p className="text-red-800 mb-4">Aşağıdaki davranışlar kesinlikle yasaktır:</p>
                  <ul className="space-y-2 text-red-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                      <span>Diğer üyelere karşı hakaret, tehdit, küfür, taciz, küçük düşürücü veya rahatsız edici tutumlar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                      <span>Irkçı, kültürel, dini veya toplumsal aşağılamaya yönelik ifadeler</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                      <span>Spam, sahte içerik veya yanıltıcı bilgi paylaşımı</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                      <span>Platformun teknik işleyişini bozacak girişimler (virüs, saldırı, yetkisiz erişim vb.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                      <span>Etik dışı veya kulüp değerlerine aykırı davranışlar</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-yellow-600 text-xl mr-3">⚠️</span>
                    <div>
                      <p className="font-semibold text-yellow-800 mb-1">Yaptırım:</p>
                      <p className="text-yellow-700 text-sm">
                        Bu tür ihlallerin tespit edilmesi halinde kulüp yönetimi, üyeliği askıya alma 
                        veya tamamen sonlandırma hakkına sahiptir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Hizmetin Kapsamı */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
                Hizmetin Kapsamı
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Metatalk Platformu yalnızca aşağıdaki amaçlarla kullanılacaktır:</p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">🗣️</div>
                    <h3 className="font-semibold text-green-900 mb-1">Dil Eşleşmesi</h3>
                    <p className="text-sm text-green-800">Dil pratiği için eşleştirme</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">🎉</div>
                    <h3 className="font-semibold text-blue-900 mb-1">Kulüp Etkinlikleri</h3>
                    <p className="text-sm text-blue-800">Organize edilen etkinlikler</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">💬</div>
                    <h3 className="font-semibold text-purple-900 mb-1">Üyeler Arası İletişim</h3>
                    <p className="text-sm text-purple-800">Güvenli mesajlaşma</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-red-600 text-xl mr-3">🚫</span>
                    <div>
                      <p className="font-semibold text-red-800 mb-1">Yasak Kullanımlar:</p>
                      <p className="text-red-700 text-sm">
                        Platform, ticari, siyasi veya reklam amaçlı kullanıma kapalıdır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 5. Sorumluluk Reddi */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</span>
                Sorumluluk Reddi
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">📝</span>
                    <span>Kullanıcılar, kendi paylaşımlarından ve platformdaki davranışlarından tamamen kendileri sorumludur.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">👥</span>
                    <span>Kulüp yönetimi, üyeler arasında yaşanan kişisel anlaşmazlıklardan sorumlu tutulamaz.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">ℹ️</span>
                    <span>Yönetim, platform üzerinden paylaşılan içeriklerin doğruluğunu garanti etmez.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 6. Platformun İşleyişi ve Değişiklikler */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">6</span>
                Platformun İşleyişi ve Değişiklikler
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">⚙️</span>
                    <span>Kulüp yönetimi, platformun işleyişinde teknik nedenlerle geçici veya kalıcı değişiklik yapabilir.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">📋</span>
                    <span>Kullanım şartları gerektiğinde güncellenebilir. Güncellenmiş şartlar, duyuru yapıldıktan sonra geçerlilik kazanır.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 7. İletişim */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">7</span>
                İletişim
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Metatalk Kulübü ile ilgili her türlü talep ve şikâyet için:</p>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <a 
                    href="mailto:medipol.metatalk@gmail.com"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    📧 medipol.metatalk@gmail.com
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kullanım Şartları Hakkında Sorularınız mı var?</h3>
              <p className="text-gray-600 mb-6">
                Platform kullanımı, yükümlülükleriniz veya haklarınız konusunda 
                herhangi bir sorunuz varsa bizimle iletişime geçin.
              </p>
              <a 
                href="mailto:medipol.metatalk@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                📧 medipol.metatalk@gmail.com
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
