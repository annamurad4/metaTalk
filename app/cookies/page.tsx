import { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Çerez Politikası | MetaTalk',
  description: 'MetaTalk Platformu Çerez Politikası - Çerezlerin nasıl kullanıldığını ve yönetildiğini öğrenin.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Çerez Politikası
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bu Çerez Politikası, Metatalk Platformu'nun kullanıcılarına ait cihazlarda çerez ve 
              benzeri teknolojilerin nasıl kullanıldığını açıklamaktadır.
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
                  Bu Çerez Politikası, Metatalk Platformu'nun (bundan sonra "Platform") kullanıcılarına 
                  ait cihazlarda çerez ve benzeri teknolojilerin nasıl kullanıldığını açıklamaktadır. 
                  Platformumuzu kullanarak bu politikada belirtilen çerez kullanımını kabul etmiş olursunuz.
                </p>
              </div>
            </Card>

            {/* 2. Çerez Nedir? */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
                Çerez Nedir?
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-blue-600 text-2xl">🍪</span>
                    </div>
                    <div className="ml-4">
                      <p>
                        Çerezler, bir internet sitesini ziyaret ettiğinizde cihazınıza (bilgisayar, tablet, telefon) 
                        kaydedilen küçük metin dosyalarıdır. Çerezler sayesinde site, tercihlerinizi ve 
                        oturum bilgilerinizi hatırlayabilir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 3. Kullanılan Çerez Türleri */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
                Kullanılan Çerez Türleri
              </h2>
              <div className="space-y-6 text-gray-700">
                <p>Metatalk Platformu aşağıdaki çerez türlerini kullanır:</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">✓</span>
                      Zorunlu Çerezler
                    </h3>
                    <p className="text-green-800 text-sm">
                      Platformun güvenli ve kesintisiz çalışması için gerekli olan çerezlerdir. 
                      (Örn. oturum açma, kimlik doğrulama)
                    </p>
                  </div>
                  
                  <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">📊</span>
                      Performans ve Analiz Çerezleri
                    </h3>
                    <p className="text-blue-800 text-sm">
                      Platformun kullanım istatistiklerini (kaç kişinin giriş yaptığı, oturum süresi vb.) 
                      ölçmek için kullanılır. Bu veriler anonimdir ve kişisel bilgi içermez.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-yellow-600 text-xl mr-3">⚠️</span>
                    <div>
                      <p className="font-semibold text-yellow-800 mb-1">Not:</p>
                      <p className="text-yellow-700 text-sm">
                        Reklam amaçlı veya üçüncü taraf çerezler kullanılmamaktadır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Çerezlerin Kullanım Amaçları */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
                Çerezlerin Kullanım Amaçları
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Çerezler aşağıdaki amaçlarla kullanılmaktadır:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">🔐</span>
                      <span className="text-sm">Oturum açma işlemlerini gerçekleştirmek</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">⚙️</span>
                      <span className="text-sm">Kullanıcı tercihlerini (dil ayarı vb.) hatırlamak</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">🛡️</span>
                      <span className="text-sm">Platformun güvenliğini sağlamak</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">📈</span>
                      <span className="text-sm">İstatistiksel analiz ve raporlama yapmak</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 5. Çerez Süresi */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</span>
                Çerez Süresi
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="p-6 bg-green-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-green-600 text-2xl">⏰</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-green-900 mb-2">Otomatik Silme</h3>
                      <p className="text-green-800">
                        Metatalk Platformu'nda kullanılan çerezler tarayıcı kapatıldığında otomatik olarak silinir 
                        (oturum çerezleri). Kalıcı çerez kullanılmamaktadır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 6. Çerezlerin Yönetimi */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">6</span>
                Çerezlerin Yönetimi
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Kullanıcılar, çerez tercihlerini istedikleri zaman tarayıcı ayarlarından değiştirebilir.</p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">🚫</div>
                    <h3 className="font-semibold text-red-900 mb-1">Engelleme</h3>
                    <p className="text-sm text-red-800">Çerezleri tamamen engelleyebilir</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <h3 className="font-semibold text-yellow-900 mb-1">Seçici İzin</h3>
                    <p className="text-sm text-yellow-800">Yalnızca belirli sitelere izin verebilir</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">🗑️</div>
                    <h3 className="font-semibold text-blue-900 mb-1">Silme</h3>
                    <p className="text-sm text-blue-800">Daha önce kaydedilmiş çerezleri silebilir</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-orange-600 text-xl mr-3">⚠️</span>
                    <div>
                      <p className="font-semibold text-orange-800 mb-1">Önemli Uyarı:</p>
                      <p className="text-orange-700 text-sm">
                        Çerezleri devre dışı bırakmanız durumunda, platformun bazı bölümleri doğru şekilde çalışmayabilir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 7. Üçüncü Taraf Hizmetleri */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">7</span>
                Üçüncü Taraf Hizmetleri
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-gray-600 text-2xl">☁️</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Cloudflare Altyapısı</h3>
                      <p className="text-gray-700">
                        Metatalk, temel güvenlik için Cloudflare altyapısı kullanmaktadır. Bu nedenle, 
                        güvenlik ve erişim doğrulama kapsamında teknik bazı veriler (IP adresi, tarayıcı bilgisi vb.) 
                        Cloudflare sistemleri üzerinden işlenebilir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 8. Politika Değişiklikleri */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">8</span>
                Politika Değişiklikleri
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Metatalk, çerez politikasını gerektiğinde güncelleyebilir. Güncel politika her zaman 
                  platform üzerinde yayınlanacaktır.
                </p>
              </div>
            </Card>

            {/* 9. İletişim */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">9</span>
                İletişim
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Çerez politikası hakkında sorularınız için bizimle iletişime geçebilirsiniz:</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Çerezler Hakkında Sorularınız mı var?</h3>
              <p className="text-gray-600 mb-6">
                Çerez kullanımımız veya tercihlerinizi nasıl yönetebileceğiniz konusunda 
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
