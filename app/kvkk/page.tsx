import { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | MetaTalk',
  description: 'MetaTalk Platformu KVKK Aydınlatma Metni - Kişisel verilerinizin işlenmesi hakkında detaylı bilgiler.',
}

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MetaTalk Platformu olarak kişisel verilerinizin korunması konusundaki yaklaşımımız ve 
              veri işleme faaliyetlerimiz hakkında detaylı bilgiler.
            </p>
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Son Güncelleme: 30.09.2025
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* 1. Veri Sorumlusu */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
                Veri Sorumlusu
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Bu platformda kişisel verilerinizin sorumlusu:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">• Unvan:</span>
                    <span>Metatalk Kulübü</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">• Adres:</span>
                    <span>Göztepe Mah, Kavacık, Atatürk Cd. No:40, 34810 Beykoz/İstanbul</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">• Telefon:</span>
                    <span>542 179 6834</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">• E-posta:</span>
                    <span>medipol.metatalk@gmail.com</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">• Web Sitesi:</span>
                    <span>metatalk.tr</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* 2. İşlenen Kişisel Veriler */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
                İşlenen Kişisel Veriler ve Kategorileri
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Platformumuz, üyelerimizin aşağıdaki kişisel verilerini toplar ve işler:</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Kimlik Bilgileri:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Ad, soyad</li>
                      <li>• Profil fotoğrafı</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">İletişim Bilgileri:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Okul e-posta adresi</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Eğitim Bilgileri:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Bölüm</li>
                      <li>• Dil seviyesi</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Demografik Bilgiler:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Yaş, doğum tarihi</li>
                      <li>• Uyruk</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">İçerik ve Kullanım Verileri:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Mesajlaşmalar, konuşma/ders video kayıtları</li>
                    <li>• Oturum bilgileri, katılım düzeni</li>
                    <li>• Teknik veriler: IP adresi, tarayıcı bilgisi, çerezler</li>
                    <li>• Site kullanım istatistikleri</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* 3. İşlenme Amaçları */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
                Kişisel Verilerin İşlenme Amaçları
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Toplanan veriler aşağıdaki amaçlarla işlenir:</p>
                <ol className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">1.</span>
                    <span>Platformdaki eşleştirme süreçlerini yürütmek</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">2.</span>
                    <span>Yüz yüze ve çevrimiçi etkinliklerin düzenli yürütülmesini sağlamak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">3.</span>
                    <span>Mesajlaşma ve konuşma/ders video kayıtlarını güvenli şekilde saklamak ve analiz etmek</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">4.</span>
                    <span>İstatistiksel analiz ve raporlama yapmak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">5.</span>
                    <span>Kulüp içi iletişim ve bilgilendirme faaliyetlerini yürütmek</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">6.</span>
                    <span>Platformun güvenliğini sağlamak ve kötüye kullanımın önüne geçmek</span>
                  </li>
                </ol>
              </div>
            </Card>

            {/* 4. Veri Toplama Kanalları */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
                Veri Toplama Kanalları ve Hukuki Sebepler
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Toplama Kanalları:</h3>
                    <p>Web sitesi üzerinden (oturum açma, kayıt formu, etkinlik kaydı)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Hukuki Sebep:</h3>
                    <p>Açık rıza ve yasal zorunluluk</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 5. Veri Saklama Süreleri */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</span>
                Veri Saklama ve Güncelleme Süreleri
              </h2>
              <div className="space-y-4 text-gray-700">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Tüm veriler 1 yıl süreyle saklanır ve yeni dönemle birlikte güncellenir.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Saklama süresi sonunda veriler silinir, yok edilir veya anonim hale getirilir.</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* 6. Veri Paylaşımı */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">6</span>
                Veri Paylaşımı ve Aktarımı
              </h2>
              <div className="space-y-4 text-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Kişisel veriler yalnızca kulüp yönetimi ve yetkili kişilerle paylaşılır.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Platformun işleyişi için gerekli hizmet sağlayıcıları ile veri paylaşımı yapılabilir.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Yurt dışı aktarım yapılması durumunda, amaç istatistiksel analiz olup, aktarılacak ülke bilgisi belirlendiğinde kullanıcıya ayrıca bildirilecektir.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Yasal zorunluluklar dışında hiçbir şekilde üçüncü kişilerle paylaşılmaz.</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* 7. Veri Güvenliği */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">7</span>
                Veri Güvenliği
              </h2>
              <div className="space-y-4 text-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Platforma yalnızca okul e-posta adresi ile giriş yapılabilir.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Veriler, Cloudflare ve diğer teknik önlemler aracılığıyla korunmaktadır.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Yetkisiz erişim, veri kaybı ve kötüye kullanım risklerini önlemeye yönelik prosedürler uygulanmaktadır.</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* 8. Kullanıcı Hakları */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">8</span>
                Kullanıcı Hakları (KVKK Madde 11)
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Kullanıcılar, veri sorumlusuna başvurarak aşağıdaki haklarını kullanabilir:</p>
                <ol className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">1.</span>
                    <span>Kişisel verilerinin işlenip işlenmediğini öğrenme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">2.</span>
                    <span>İşlenmişse buna ilişkin bilgi talep etme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">3.</span>
                    <span>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">4.</span>
                    <span>Verilerin silinmesini veya yok edilmesini talep etme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">5.</span>
                    <span>İşlemenin kısıtlanmasını isteme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">6.</span>
                    <span>Veri işleme faaliyetlerine itiraz etme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-3">7.</span>
                    <span>Zarara uğramaları hâlinde tazminat talep etme</span>
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">Başvuru Yöntemi:</p>
                  <p className="text-blue-800">Taleplerinizi <a href="mailto:medipol.metatalk@gmail.com" className="underline hover:no-underline">medipol.metatalk@gmail.com</a> üzerinden iletebilirsiniz.</p>
                </div>
              </div>
            </Card>

            {/* 9. Güncelleme Tarihleri */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">9</span>
                Güncelleme ve Revizyon Tarihleri
              </h2>
              <div className="space-y-4 text-gray-700">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Son Güncelleme: 30.09.2025</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-gray-900 mr-2">•</span>
                    <span>Bir Sonraki Revizyon: 30.09.2026</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sorularınız mı var?</h3>
              <p className="text-gray-600 mb-6">
                KVKK kapsamındaki haklarınız veya veri işleme faaliyetlerimiz hakkında 
                herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz.
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
