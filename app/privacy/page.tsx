import { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | MetaTalk',
  description: 'MetaTalk Platformu Gizlilik Politikası - Kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu öğrenin.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Gizlilik Politikası
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MetaTalk, İstanbul Medipol Üniversitesi öğrencileri için kurulmuş bir kulüp platformudur. 
              Bu gizlilik politikası, üyelerimizin ve kullanıcılarımızın kişisel verilerinin nasıl 
              toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklamaktadır.
            </p>
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Son Güncelleme: 30.09.2025
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
                  MetaTalk, İstanbul Medipol Üniversitesi öğrencileri için kurulmuş bir kulüp platformudur. 
                  Bu gizlilik politikası, üyelerimizin ve kullanıcılarımızın kişisel verilerinin nasıl 
                  toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklamaktadır.
                </p>
              </div>
            </Card>

            {/* 2. Toplanan Veriler */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
                Toplanan Veriler
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>MetaTalk platformu aşağıdaki verileri toplar:</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Temel Bilgiler</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Ad, soyad</li>
                        <li>• Okul e-posta adresi</li>
                        <li>• Bölüm bilgisi</li>
                        <li>• Dil seviyesi</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Profil Bilgileri</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Profil fotoğrafı</li>
                        <li>• Uyruk</li>
                        <li>• Yaş ve doğum tarihi</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Kullanım Verileri</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Platform kullanım verileri</li>
                        <li>• Oturum bilgileri</li>
                        <li>• Katılım düzeni</li>
                        <li>• Eşleşme kayıtları</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">İçerik Verileri</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Mesajlaşmalar</li>
                        <li>• Konuşma/ders video kayıtları</li>
                        <li>• Çerezler aracılığıyla toplanan teknik veriler</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Teknik Veriler:</strong> IP adresi, tarayıcı bilgisi, site kullanım istatistikleri
                  </p>
                </div>
              </div>
            </Card>

            {/* 3. Verilerin Kullanım Amaçları */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
                Verilerin Kullanım Amaçları
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Toplanan veriler aşağıdaki amaçlarla işlenir:</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">✓</span>
                      <span>Kullanıcıların eşleştirme süreçlerine katılımını sağlamak</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">✓</span>
                      <span>Platform ve yüz yüze etkinliklerin düzenli yürütülmesini sağlamak</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">✓</span>
                      <span>Mesajlaşma ve konuşma/ders kayıtlarını güvenli şekilde saklamak ve analiz etmek</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">✓</span>
                      <span>İstatistiksel analiz ve raporlama yapmak</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">✓</span>
                      <span>Kulüp içi iletişim ve bilgilendirme faaliyetlerini yürütmek</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">✓</span>
                      <span>Platformun güvenliğini sağlamak ve kötüye kullanımın önüne geçmek</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Veri Saklama Süresi */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</span>
                Veri Saklama Süresi
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-yellow-600 text-xl">⏰</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Saklama Süresi</h3>
                      <ul className="space-y-2 text-yellow-700">
                        <li>• Tüm veriler 1 yıl boyunca saklanır ve yeni dönemle birlikte güncellenir.</li>
                        <li>• Saklama süresi sonunda veriler silinir, yok edilir veya anonim hale getirilir.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 5. Veri Paylaşımı ve Aktarımı */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</span>
                Veri Paylaşımı ve Aktarımı
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">🔒</span>
                    <span>Veriler yalnızca kulüp yönetimi ve yetkili kişilerle paylaşılır.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">🔒</span>
                    <span>Platformun işleyişi için gerekli hizmet sağlayıcıları ile veri paylaşımı yapılabilir.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">🔒</span>
                    <span>Yurt dışı aktarım yapılacaksa, sadece platform hizmetlerinin sağlanması ve yasal zorunluluklar kapsamında aktarım yapılır.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">❌</span>
                    <span>Yasal zorunluluklar dışında hiçbir şekilde üçüncü kişilerle paylaşılmaz.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 6. Çerezler */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">6</span>
                Çerezler (Cookies) ve Benzeri Teknolojiler
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Zorunlu Çerezler</h3>
                    <p className="text-sm text-green-800">Oturum açma, güvenlik, kimlik doğrulama</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Performans Çerezleri</h3>
                    <p className="text-sm text-blue-800">Site kullanımını ölçmek için</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Not:</strong> Çerez tercihleri kullanıcılar tarafından tarayıcı ayarlarından değiştirilebilir.
                  </p>
                </div>
              </div>
            </Card>

            {/* 7. Veri Güvenliği */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">7</span>
                Veri Güvenliği
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">🔐</div>
                    <h3 className="font-semibold text-green-900 mb-1">Şifreleme</h3>
                    <p className="text-sm text-green-800">Verileriniz şifrelenerek korunur</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">👥</div>
                    <h3 className="font-semibold text-blue-900 mb-1">Yetkilendirme</h3>
                    <p className="text-sm text-blue-800">Sadece yetkili kişiler erişebilir</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <div className="text-2xl mb-2">🛡️</div>
                    <h3 className="font-semibold text-purple-900 mb-1">Erişim Kontrolü</h3>
                    <p className="text-sm text-purple-800">Güvenlik prosedürleri uygulanır</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li>• Veriler, şifreleme, yetkilendirme ve erişim denetimi gibi teknik ve idari tedbirlerle korunur.</li>
                    <li>• Platforma yalnızca yetkili kişiler erişebilir.</li>
                    <li>• Veri kaybı, yetkisiz erişim ve kötüye kullanım risklerini önlemeye yönelik prosedürler uygulanmaktadır.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* 8. Kullanıcı Hakları */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">8</span>
                Kullanıcı Hakları
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>KVKK kapsamında kullanıcılarımız şu haklara sahiptir:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">1</span>
                      <span className="text-sm">Kişisel verilerinin işlenip işlenmediğini öğrenme</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">2</span>
                      <span className="text-sm">İşlenmişse buna ilişkin bilgi talep etme</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">3</span>
                      <span className="text-sm">Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">4</span>
                      <span className="text-sm">Verilerin silinmesini veya yok edilmesini talep etme</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">5</span>
                      <span className="text-sm">İşlemenin kısıtlanmasını isteme</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">6</span>
                      <span className="text-sm">İtiraz etme</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">7</span>
                      <span className="text-sm">Zarara uğramaları hâlinde tazminat talep etme</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 9. Güncelleme Tarihi */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">9</span>
                Güncelleme Tarihi
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Bu politika, 30.09.2025 itibariyle geçerlidir ve gerektiğinde güncellenebilir.</p>
              </div>
            </Card>

            {/* 10. İletişim */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">10</span>
                İletişim
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Sorularınız ve talepleriniz için bizimle iletişime geçebilirsiniz:</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gizlilik Konusunda Endişeleriniz mi var?</h3>
              <p className="text-gray-600 mb-6">
                Kişisel verilerinizin korunması konusunda herhangi bir sorunuz veya talebiniz varsa 
                bizimle iletişime geçmekten çekinmeyin.
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
