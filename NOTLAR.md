# Dağıtım ve Uyumlandırma Notları

Bu dosya, Render dağıtımı sırasında yapılan minimal ve hedefli kod değişikliklerini listeler.

- prisma/schema.prisma: provider sqlite -> postgresql; Neon kullanımı için ayarlandı.
- package.json: "engines": { "node": ">=20 <21" } eklendi.
- app/api/sessions/[id]/route.ts: Route handler imzaları Next.js 15’e uyarlandı (Request ve Promise params).
- app/api/user-languages/[id]/route.ts: DELETE handler imzası Request ve Promise params ile güncellendi.
- app/api/socket/route.ts: Geçersiz export kaldırıldı; imza Request ile düzeltildi.
- app/chat/[id]/page.tsx: Dinamik parametre almak için useParams() kullanıldı.
- app/chat/session/[id]/page.tsx: Dinamik parametre almak için useParams() kullanıldı.
- app/api/auth/login-password/route.ts: Zod .errors -> .issues olarak düzeltildi.
- app/api/auth/set-password/route.ts: cookies() çağrısı await ile kullanıldı.
- app/api/sessions/create-room/route.ts: JWTPayload yerine AccessTokenPayload; payload.userId -> payload.sub; Request imzası; güvenli cookie erişimi.
- app/api/sessions/join-room/route.ts: JWTPayload -> AccessTokenPayload; userId -> sub; Request imzası; cookie erişimi düzeltildi.
- app/api/sessions/room-stats/route.ts: JWTPayload -> AccessTokenPayload; Request imzası; cookie erişimi düzeltildi.
- app/components/ui/avatar.tsx: Avatar şimdi src ve alt prop’larını destekliyor; fallback görünürlüğü src’ye göre ayarlandı.
- app/components/forms/profile-form.tsx: Framer Motion transition tip hatası giderildi; transition prop’ları motion bileşenlerine taşındı.
- app/components/forms/profile-form.tsx: Select kullanımını custom UI Select (Trigger/Value/Content/Item) ile güncelledik; RHF entegrasyonu için watch/setValue kullanıldı.
- app/components/ui/combobox.tsx: Çoklu seçim ve onChange uyumluluğu için genişletildi (value string|string[], multiple, maxSelections).

Not: Tüm değişiklikler derleme/tip uyumluluğu için minimal tutuldu; işlevsellik korunmaya çalışıldı.
