```markdown
# MetaTalk – MVP Başlangıç Stratejisi ve İlerleme

Durum ikonları: ⏳ bekliyor · 🚧 çalışılıyor · ✅ tamamlandı

## 1) Hızlı Prototip
Amaç: Minimum sürede görünür bir iskelet uygulama.
- ✅ Next.js projeyi kur (TypeScript, App Router, Tailwind, ESLint)
- ✅ Temel sayfalar: landing (`/`), login, register, verify-email
- ✅ Basit layout ve navigasyon
- ✅ Merkezi routing (`app/lib/routes.ts`) ve path yardımcıları

Çıktı: Repo klonla → `pnpm dev` ile aç → sayfalar çalışır.

## 2) Temel Auth
Amaç: @std.medipol.edu.tr e-posta + 4 haneli kod ile doğrulama.
- ✅ E-posta domain doğrulama (input mask: `isim.soyisim@std.medipol.edu.tr`)
- ✅ Kod üretimi (0000–9999), 5 dk geçerlilik, 3 deneme/10 dk rate limit
- ✅ Kod gönderimi (Brevo SMTP) — timeout + retry, non-blocking
- ✅ Doğrulama API’leri: send-code, verify-code
- ✅ Kullanıcı oluşturma / doğrulama ve HttpOnly JWT cookie
 - ✅ Login akışı: /auth/login → send-code → verify-email → /profile

Çıktı: Kayıt → kod e-postası → doğrula → giriş.

## 3) Veritabanı
Amaç: Kalıcı veri modeli ve ORM akışı.
- ⏳ Prisma + PlanetScale bağlantısı
- ✅ Şema: `users`, `languages`, `user_languages` (+ CEFR enum)
- ✅ Seed: Popüler ISO-639-1 dilleri yüklendi

Çıktı: `prisma migrate` başarılı, temel CRUD mümkün.

## 4) Profil Yönetimi (MVP)
Amaç: Temel profil bilgileri.
- ✅ Profil formu: ad, soyad, bölüm, sınıf, avatar URL (opsiyonel)
- ✅ Server-side validation (Zod)
- 🚧 Avatar yükleme (yöntem karar SONRA) – geçici placeholder
 - ✅ Diller: learn/teach + CEFR seviye yönetimi

Çıktı: Kullanıcı profilini görüntüleyip düzenleyebilir.

## 5) Admin Paneli (MVP)
Amaç: Basit moderasyon.
- ⏳ Ban/ban kaldırma
- ⏳ Şikayet görüntüleme
- ⏳ Basit istatistik kartları (kayıt sayısı, doğrulama oranı vb.)

Çıktı: Admin rolü ile temel yönetim yapılır.

## 6) Görüşme (MVP)
Amaç: Daily.co ile 30 dakikalık ephemeral görüşme, kayıt kapalı.
- ⏳ Daily.co iFrame entegrasyonu (odaya giriş/çıkış)
- ⏳ Metin sohbeti (Daily.co chat), ekran paylaşımı açık
- ⏳ Oturum sonu 1–5 yıldız puanlama (ortalama daha sonra)

### 6.1) Müsaitlik ve Eşleştirme (Plan)
- ✅ Kullanıcı modeli: `user_availability` ile 1–7 arası gün bilgisi kaydı
- ⏳ Eşleştirme algoritması (V1):
  - Girdi: kullanıcının `learn` ve `teach` dilleri, CEFR seviyesi, `user_availability`
  - Çıktı: Uygun gün kesişimi + dil eşleşmesine göre aday liste (skorlanmış)
  - Durum: Şimdilik pasif; buton yer tutucu, algoritma sonra eklenecek
- ⏳ Chat (V1): Adaylar listelendiğinde, kullanıcılar chat ile saat detayını netleştirir

Test Aşaması (Geçici UI):
- "Oda linki ile katıl" inputu + "Odaya Katıl" butonu
- "Oda Oluştur" butonu (oluşturulan oda linkini log'a yaz)

Çıktı: Eşleşmiş iki kullanıcı görüntülü görüşme yapar.

## 7) DevEx, Güvenlik ve Gözlem
Amaç: Sağlam temeller.
- ⏳ Zod ile tüm inputlarda server-side validation
- ✅ Rate limit middleware (auth ve kod doğrulama uçları)
- ⏳ Basit loglama (platform logları) ve hata yakalama deseni
 - ✅ Çıkış (logout) ve route koruması (middleware)

---

Notlar:
- Müsaitlik planlama, manuel eşleştirme detayları MVP sonunda şekillenecek.
- Profil fotoğrafı depolama yöntemi (Vercel Blob / R2) daha sonra kararlaştırılacak.
- Daily.co ephemeral oda yönetimi (30 dakika otomatik silme) birlikte araştırılacak.
- Verify kod geldiğinde kutucuğa doldurma işlemini UX açısından geliştir.
- Şifremi unuttum seçeneği aktif edilecek (parola sıfırlama akışı eklenecek)
- 2FA etkinleştirme özelliği geliştirilecek (TOTP/SMS eklenecek)
- Kullanıcı profili istatistik alanları eklenecek:
  - `total_sessions`: Görüşme sayısı (varsayılan: 0) - Yeni görüşme tamamlandıkça arttırılacak
  - `languages_learned`: Öğrenilen dil sayısı (varsayılan: 0) - `user_languages` tablosundan hesaplanacak
  - `languages_taught`: Öğretilen dil sayısı (varsayılan: 0) - `user_languages` tablosundan hesaplanacak
  - `average_rating`: Ortalama puan (varsayılan: 4.8) - Görüşme puanlarından hesaplanacak puanlama sistemi geliştirilecek
  - `active_days`: Aktif gün sayısı - Kayıt tarihinden itibaren geçen gün sayısı

Ek MVP Önerileri (geliştirilebilir sayfalar/özellikler):
- Basit aday eşleştirme listesi (`/matches`): dil/seviye filtreleriyle manuel seçim; algoritma hazır olana kadar placeholder skor.
- Müsaitlik mini formu (`/profile#availability`): 1–7 gün toggle; saat aralığı olmadan hızlı kayıt.
- Oturum geçmişi sayfası (`/sessions/history`): tamamlanan görüşmeler ve hızlı puan verme bağlantısı.
- Yardım/SSS & kurallar (`/help`): platform kuralları, Daily.co ipuçları, etik rehber.
- KVKK/Aydınlatma & Kullanım Şartları (`/privacy`, `/terms`): statik sayfalar (deploy için gerekli).
- Health check endpoint (`/api/health`): deployment sonrası temel sağlık kontrolü.
- Görüşme öncesi cihaz testi (`/precall`): kamera/mikrofon izin ve basit cihaz seçimi.
- Admin manuel eşleştirme (`/admin/matches`): iki kullanıcıyı tek tıkla eşleştir (MVP moderasyon).
- E‑posta şablon önizleme (dev) (`/dev/email-preview`): send-code/verify e-postalarını hızlı görmek.
- Minimal global toast sistemi: başarılı/başarısız aksiyon bildirimleri (erken geri bildirim için).

## 8) UI/UX Katmanı (Profesyonel Tasarım Yol Haritası)
Amaç: Kullanılabilir, erişilebilir ve güven veren modern arayüz.

### 8.1) Bileşen Kütüphanesi ve Tasarım Sistemi
- ✅ Tasarım token'ları: tipografi ölçekleri, spacing/size, border‑radius, shadow, renk paleti (açık/koyu hazır)
- ✅ Temel bileşenler: Button, Input, Select/Combobox, Badge/Chip, Card, Modal/Drawer, Tabs, Tooltip, Toast
- ✅ Durumlar: hover/active/disabled/focus-visible; hatalar/uyarılar/başarı tonları; yükleniyor (spinner+skeleton)
- ✅ Erişilebilirlik: ARIA etiketleri, kontrast ≥ WCAG AA, klavye navigasyonu; form alanlarında `aria-invalid`/`aria-describedby`

### 8.2) Ana Sayfa Tasarımı
- ✅ Modern ve profesyonel landing page tasarımı
- ✅ Proje amacına uygun hero section (dil pratiği platformu)
- ✅ Özellik kartları ve değer önerisi bölümleri
- ✅ CTA butonları (Giriş/Kayıt) ve navigasyon
- ✅ Responsive tasarım (mobile-first)
- ✅ Smooth scroll ve micro-interactions

### 8.3) Auth Akışları UX İyileştirmeleri
- ✅ Kayıt/Giriş sayfaları için minimal ve güven veren görsel dil
- ✅ OTP ekranı: 4'lü ayrı kutu (auto‑focus/auto‑advance), yapıştırma desteği
- ✅ Form validasyonu: inline doğrulama ve net hata metinleri
- ✅ Loading states ve progress göstergeleri
- ✅ Başarı sonrası yönlendirme: yumuşak geçişler

### 8.4) Profil Yönetimi UX
- ✅ Avatar yönetimi: placeholder + inisyal avatar sistemi
- ✅ Diller alanı: Combobox ile arama, çoklu seçim "chip"leri
- ✅ CEFR seviye dropdown ve kaldır butonları
- ✅ Optimistic updates + toast bildirimleri
- ✅ Form kaydetme UX'i ve hata yönetimi

### 8.5) Layout & Navigasyon
- ✅ Responsive grid (mobile-first), container genişlikleri
- ✅ Header: auth durumuna göre CTA, yapışkan üst menü
- ✅ Skeleton loading states (profil, liste, detay)
- ✅ Breadcrumbs (gerekli sayfalarda)

### 8.6) Eşleştirme Listesi (MVP Sonu)
- ⏳ Kart tasarımı: ad, bölüm/sınıf, diller/seviyeler
- ⏳ Filtre barı: dil/seviye, online/çevrimdışı, sıralama
- ⏳ Boş durum (empty‑state) mesajı + CTA
- ⏳ Sayfalama/sonsuz kaydırma, iskelet kartlar

### 8.7) Görüşme (Daily.co) UI
- ⏳ Pre‑call kontrol: kamera/mikrofon seçimi, bağlantı testi
- ⏳ Oda içi UI: süre sayacı, basit toolbar
- ⏳ Bitiş sonrası yıldız puan modalı

### 8.8) Admin Paneli (V1)
- ⏳ Tablo UX: arama, sıralama, sayfalama
- ⏳ Durum rozetleri ve toplu işlemler
- ⏳ Ban/ban kaldırma arayüzü

### 8.9) Bildirim/Feedback Sistemi
- ⏳ Global toast sistemi
- ⏳ Error Boundary ile sayfa bazlı hata ekranları
- ⏳ Boş durumlar için yönlendirici metin/CTA

### 8.10) Performans ve Optimizasyon
- ⏳ Kod bölme (route level), kritik CSS küçültme
- ⏳ `next/font` ile optimize font yükleme
- ⏳ Görsel optimizasyonu, lazy hydration
- ⏳ Ağır bileşenleri dinamik import

### 8.11) Marka & E‑posta
- ⏳ Logo/favikon tasarımı
- ⏳ E‑posta şablonlarını marka renkleriyle uyumlama

**Yeni Uygulama Sırası:**
1) Bileşen kütüphanesi + tasarım token'ları
2) Ana sayfa tasarımı ve implementasyonu
3) Auth akışları UX iyileştirmeleri
4) Profil yönetimi UX geliştirmeleri
5) Layout & navigasyon sistemi
6) Diğer sayfa ve özellik UX'leri
```


