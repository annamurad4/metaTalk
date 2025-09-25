```markdown
# MetaTalk – V1 Yol Haritası ve Gereksinimler

Durum ikonları: ⏳ bekliyor · 🚧 çalışılıyor · ✅ tamamlandı

## 1) Admin Paneli (Öncelik)
Açıklama: Moderasyon ve operasyon verimliliği için tek merkez.
- ⏳ Admin panelinde direkt ilgili kullanıcıya ulaşıp işlem yapabilme (arama → detay → aksiyon)
- ⏳ Kullanıcı eylemleri: ban/ban kaldır, e‑posta doğrulamasını sıfırla, profil düzenleme kilidi
- ⏳ Şikayet (report) listesi ve durum yönetimi (açık/çözüldü/işlemde)
- ⏳ Manuel eşleştirme: iki kullanıcıyı eşleştir ve görüşme oturumu oluştur
- ⏳ Basit istatistik kartları: toplam kayıt, aktif kullanıcı, banlı kullanıcı, doğrulama oranı
- ⏳ **Contact Form Entegrasyonu**: Contact sayfasından gelen mesajları admin panelinde görüntüleme
- ⏳ **Şikayet/Öneri Yönetimi**: Contact formundan gelen sorun, şikayet ve önerileri kategorize etme ve sıralama
- ⏳ **Mesaj Durum Takibi**: Gelen mesajları "yeni/okundu/yanıtlandı/kapandı" durumlarıyla takip etme
- ⏳ **Otomatik Yanıt Sistemi**: Belirli kategoriler için otomatik e-posta yanıtları gönderme
- ⏳ **Mesaj Filtreleme**: Mesaj türüne, tarihe, duruma göre filtreleme ve arama özelliği
- ⏳ **Yönetici Başvuru Sistemi**: Yönetici olmak isteyenler için başvuru formu ve değerlendirme süreci
- ⏳ **Yöneticiler Listesi**: Aktif yöneticilerin listesi, rolleri ve yetkileri görüntüleme
- ⏳ **Yönetici Yetkilendirme**: Yeni yönetici ekleme, rol atama ve yetki yönetimi

Çıktı: Admin tek ekrandan kullanıcıyı bulur, contact mesajlarını yönetir, yönetici başvurularını değerlendirir ve gerekli işlemleri güvenle yürütür.

## 2) Eşleştirme ve Görüşme
Açıklama: Daha tutarlı eşleşme ve görüşme deneyimi.
- ⏳ Eşleştirme algoritması (V1): learn/teach dilleri + CEFR + müsaitlik kesişimi
- ⏳ Aday listesi: manuel seçim + placeholder skor/sıralama
- ⏳ Daily.co iFrame entegrasyonu stabilizasyonu (oda giriş/çıkış, chat, ekran paylaşımı)
- ⏳ Oturum sonu 1–5 yıldız puanlama ve geri bildirim notu
- ⏳ Oturum geçmişi: tamamlanan görüşmelerin listesi ve hızlı puan verme

Çıktı: Uygun adaylar listelenir, güvenli görüşme yapılır ve puanlanır.

## 3) Profil ve Kullanıcı Özellikleri
Açıklama: Kullanıcı profilinin işlevsel ve güncel kalması.
- ⏳ Müsaitlik mini formu: 1–7 gün toggle (saat aralığı olmadan)
- ⏳ Profil istatistik alanları: total_sessions, languages_learned/taught, average_rating, active_days
- ⏳ Avatar yükleme yöntemi kararı ve entegrasyonu (Vercel Blob / R2) + fallback

Çıktı: Profil kolayca yönetilir, istatistikler güncel ve görünür.

## 4) Contact Form Backend ve Veritabanı
Açıklama: Contact form entegrasyonu ve mesaj yönetimi altyapısı.
- ⏳ **Contact Messages Tablosu**: Mesajları veritabanında saklama (name, email, subject, message, type, status, created_at)
- ⏳ **API Endpoint**: `/api/contact` POST endpoint'i ile form gönderimi
- ⏳ **E-posta Bildirimleri**: Yeni mesaj geldiğinde admin'lere otomatik e-posta gönderimi
- ⏳ **Mesaj Durum Yönetimi**: Database'de mesaj durumlarını güncelleme (new, read, replied, closed)
- ⏳ **Admin API Endpoints**: `/api/admin/contact` ile mesajları listeleme, güncelleme, silme
- ⏳ **Rate Limiting**: Contact form için spam koruması (IP bazlı sınırlama)
- ⏳ **Form Validation**: Server-side doğrulama ve güvenlik kontrolleri

Çıktı: Contact form tamamen işlevsel, mesajlar güvenli şekilde saklanır ve admin panelinde yönetilir.

## 5) Yönetici Başvuru ve Yetkilendirme Sistemi
Açıklama: Yönetici ekibi genişletme ve yetki yönetimi için kapsamlı sistem.
- ⏳ **Admin Application Form**: Yönetici başvuru formu (kişisel bilgiler, motivasyon, deneyim)
- ⏳ **Application Database**: Başvuruları veritabanında saklama ve durum takibi (pending/reviewed/approved/rejected)
- ⏳ **Admin Review Process**: Mevcut yöneticilerin başvuruları inceleme ve değerlendirme sistemi
- ⏳ **Role-Based Access Control**: Farklı yönetici rolleri (super_admin, admin, moderator) ve yetki seviyeleri
- ⏳ **Admin Dashboard**: Yönetici başvurularını görüntüleme, değerlendirme ve karar verme arayüzü
- ⏳ **Notification System**: Başvuru durumu değişikliklerinde otomatik e-posta bildirimleri
- ⏳ **Admin List Page**: Aktif yöneticilerin listesi, rolleri, son aktivite tarihleri
- ⏳ **Admin Management**: Yönetici ekleme, çıkarma, rol değiştirme işlemleri
- ⏳ **Activity Logging**: Yönetici eylemlerinin loglanması ve denetim izi

Çıktı: Yönetici ekibi güvenli ve kontrollü şekilde genişletilir, tüm yetkilendirmeler takip edilir.

## 6) Bildirim ve Geri Bildirim
Açıklama: Sistem durumlarını şeffaf iletmek.
- ⏳ Global toast sistemi: başarılı/başarısız aksiyon bildirimleri
- ⏳ Error Boundary: sayfa bazlı hata ekranları
- ⏳ E‑posta şablon önizleme (dev): send-code/verify e-postaları için

Çıktı: Kullanıcı ve ekip, işlemlerin sonucunu hızlıca görür.

## 7) Güvenlik, Gözlem ve Sağlık
Açıklama: Üretim güvenliği ve gözlemlenebilirlik.
- ⏳ Sentry ile hata izleme (V1)
- ⏳ Structured logging (request-id, user-id, elapsed time)
- ⏳ Rate limiting iyileştirmeleri (auth ve yoğun uçlar)
- ⏳ Health check endpoint (`/api/health`) ve temel metrikler

Çıktı: Hatalar hızlı yakalanır, servis sağlığı takip edilir.

## 8) Performans ve Optimizasyon
Açıklama: Hızlı yüklenme ve verimli çalışma.
- ⏳ Route-level code splitting ve kritik CSS küçültme
- ⏳ `next/font` ile font yükleme optimizasyonu
- ⏳ Bundle analizi ve ağır bileşenlerin dinamik importu
- ⏳ ISR/SWR önbellekleme stratejileri

Çıktı: Sayfalar hızlı açılır, kaynak kullanımı verimli olur.

## 9) Test ve Kalite Güvencesi
Açıklama: Güvenle değişiklik yapabilmek.
- ⏳ Unit testler (Jest/Vitest) ve integration testleri (API)
- ⏳ E2E testleri (Playwright) ve ≥ %70 coverage
- ⏳ Test veri tohumlama ve mocking yardımcıları

Çıktı: Kritik akışlar otomatik testlerle güvence altında.

## 10) Dokümantasyon ve Yasal Sayfalar
Açıklama: Kullanıcı bilgilendirme ve ekip içi netlik.
- ⏳ Yardım/SSS & kurallar sayfası (`/help`)
- ⏳ KVKK/Aydınlatma & Kullanım Şartları (`/privacy`, `/terms`)
- ⏳ README ve Memory Bank güncellemeleri (activeContext/techContext/systemPatterns)

Çıktı: Gereken yasal ve bilgi sayfaları yayında, ekip belgeleri güncel.

## 11) Yayın ve Ortam
Açıklama: Üretim hazırlığı ve süreçler.
- ⏳ Ortam değişkenleri doğrulama ve dokümantasyon
- ⏳ Prisma migration’ları ve seed akışı
- ⏳ Build, test ve health check doğrulamaları

Çıktı: V1 dağıtımı güvenle yapılır, geri dönüşler izlenir.

---

Kısa Notlar:
- Admin paneli V1’in ilk önceliğidir; kullanıcıya hızlı erişim ve aksiyon akışı kritik.
- Eşleştirme algoritması basit kurallarla başlar; skor/öğrenme V2’ye evrilir.
- Performans ve test altyapısı, MVP’de kurulan temeller üzerine V1’de güçlendirilir.
```

