/**
 * Veritabanı seed dosyası - Test kullanıcıları ve verileri
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Test kullanıcıları
const testUsers = [
  {
    email: 'ahmet.yilmaz@std.medipol.edu.tr',
    name: 'Ahmet',
    surname: 'Yılmaz',
    department: 'Bilgisayar Mühendisliği',
    class_year: 3,
    credits: 10,
  },
  {
    email: 'ayse.kaya@std.medipol.edu.tr',
    name: 'Ayşe',
    surname: 'Kaya',
    department: 'İngiliz Dili ve Edebiyatı',
    class_year: 2,
    credits: 10,
  },
  {
    email: 'mehmet.demir@std.medipol.edu.tr',
    name: 'Mehmet',
    surname: 'Demir',
    department: 'Tıp',
    class_year: 4,
    credits: 10,
  },
  {
    email: 'fatma.ozturk@std.medipol.edu.tr',
    name: 'Fatma',
    surname: 'Öztürk',
    department: 'Mütercim Tercümanlık',
    class_year: 1,
    credits: 10,
  },
  {
    email: 'ali.celik@std.medipol.edu.tr',
    name: 'Ali',
    surname: 'Çelik',
    department: 'İşletme',
    class_year: 2,
    credits: 10,
  },
  {
    email: 'zeynep.arslan@std.medipol.edu.tr',
    name: 'Zeynep',
    surname: 'Arslan',
    department: 'Psikoloji',
    class_year: 3,
    credits: 10,
  },
  {
    email: 'burak.koc@std.medipol.edu.tr',
    name: 'Burak',
    surname: 'Koç',
    department: 'Elektrik-Elektronik Mühendisliği',
    class_year: 4,
    credits: 10,
  },
  {
    email: 'elif.sahin@std.medipol.edu.tr',
    name: 'Elif',
    surname: 'Şahin',
    department: 'Almanca Öğretmenliği',
    class_year: 2,
    credits: 10,
  },
  {
    email: 'can.yildiz@std.medipol.edu.tr',
    name: 'Can',
    surname: 'Yıldız',
    department: 'Fransız Dili ve Edebiyatı',
    class_year: 1,
    credits: 10,
  },
  {
    email: 'seda.akbas@std.medipol.edu.tr',
    name: 'Seda',
    surname: 'Akbaş',
    department: 'İspanyol Dili ve Edebiyatı',
    class_year: 3,
    credits: 10,
  },
];

// Diller
const languages = [
	{ code: 'en', name: 'İngilizce' },
	{ code: 'de', name: 'Almanca' },
	{ code: 'fr', name: 'Fransızca' },
  { code: 'es', name: 'İspanyolca' },
	{ code: 'it', name: 'İtalyanca' },
	{ code: 'ru', name: 'Rusça' },
  { code: 'ar', name: 'Arapça' },
	{ code: 'ja', name: 'Japonca' },
	{ code: 'ko', name: 'Korece' },
	{ code: 'zh', name: 'Çince' },
];

// Kullanıcı dil tercihleri (öğrenmek istediği ve öğretebileceği diller)
const userLanguagePreferences = [
  // Ahmet - İngilizce öğrenmek istiyor, Almanca öğretebiliyor
  { userId: 0, learn: ['en'], teach: ['de'] },
  // Ayşe - Almanca ve Fransızca öğrenmek istiyor, İngilizce öğretebiliyor
  { userId: 1, learn: ['de', 'fr'], teach: ['en'] },
  // Mehmet - İngilizce öğrenmek istiyor, Türkçe öğretebiliyor (ama Türkçe yok, İspanyolca olsun)
  { userId: 2, learn: ['en'], teach: ['es'] },
  // Fatma - İtalyanca öğrenmek istiyor, İngilizce ve Almanca öğretebiliyor
  { userId: 3, learn: ['it'], teach: ['en', 'de'] },
  // Ali - Rusça öğrenmek istiyor, İngilizce öğretebiliyor
  { userId: 4, learn: ['ru'], teach: ['en'] },
  // Zeynep - Fransızca öğrenmek istiyor, İngilizce öğretebiliyor
  { userId: 5, learn: ['fr'], teach: ['en'] },
  // Burak - Japonca öğrenmek istiyor, İngilizce ve Almanca öğretebiliyor
  { userId: 6, learn: ['ja'], teach: ['en', 'de'] },
  // Elif - İngilizce öğrenmek istiyor, Almanca öğretebiliyor
  { userId: 7, learn: ['en'], teach: ['de'] },
  // Can - İspanyolca öğrenmek istiyor, Fransızca öğretebiliyor
  { userId: 8, learn: ['es'], teach: ['fr'] },
  // Seda - İtalyanca öğrenmek istiyor, İspanyolca öğretebiliyor
  { userId: 9, learn: ['it'], teach: ['es'] },
];

// Müsait günler (1-7 arası, Pazartesi-Pazar)
const availabilityDays = [1, 2, 3, 4, 5, 6, 7]; // Hepsi 7 gün müsait

async function main() {
  console.log('🌱 Seed verisi yükleniyor...');

  // Test kullanıcıları için varsayılan parola
  const defaultPassword: string = process.env.SEED_DEFAULT_PASSWORD ?? 'MetaTalk123!';
  const passwordHash: string = await bcrypt.hash(defaultPassword, 10);

  // 1. Dilleri oluştur
  console.log('📚 Diller oluşturuluyor...');
  for (const lang of languages) {
    await prisma.language.upsert({
      where: { code: lang.code },
      update: {},
      create: lang,
    });
  }

  // 2. Test kullanıcılarını oluştur
  console.log('👥 Test kullanıcıları oluşturuluyor...');
  const createdUsers = [];
  for (const user of testUsers) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        email_verified: true,
        // Test kullanıcıları için varsayılan hash'lenmiş parola
        password_hash: passwordHash,
        password_set_at: new Date(),
      },
    });
    createdUsers.push(createdUser);
  }

  // 3. Kullanıcı dil tercihlerini oluştur
  console.log('🗣️ Kullanıcı dil tercihleri oluşturuluyor...');
  for (const pref of userLanguagePreferences) {
    const user = createdUsers[pref.userId];
    
    // Öğrenmek istediği diller
    for (const langCode of pref.learn) {
      const language = await prisma.language.findUnique({
        where: { code: langCode },
      });
      if (language) {
        await prisma.userLanguage.upsert({
          where: {
            user_id_language_id_role: {
              user_id: user.id,
              language_id: language.id,
              role: 'learn',
            },
          },
          update: {},
          create: {
            user_id: user.id,
            language_id: language.id,
            role: 'learn',
            level: 'A2', // Varsayılan seviye
          },
        });
      }
    }

    // Öğretebileceği diller
    for (const langCode of pref.teach) {
      const language = await prisma.language.findUnique({
        where: { code: langCode },
      });
      if (language) {
        await prisma.userLanguage.upsert({
          where: {
            user_id_language_id_role: {
              user_id: user.id,
              language_id: language.id,
              role: 'teach',
            },
          },
          update: {},
          create: {
            user_id: user.id,
            language_id: language.id,
            role: 'teach',
            level: 'B2', // Varsayılan seviye
          },
        });
      }
    }
  }

  // 4. Müsait günleri oluştur (hepsi 7 gün müsait)
  console.log('📅 Müsait günler oluşturuluyor...');
  for (const user of createdUsers) {
    for (const day of availabilityDays) {
      await prisma.userAvailability.upsert({
        where: {
          user_id_day: {
            user_id: user.id,
            day: day,
          },
        },
        update: {},
        create: {
          user_id: user.id,
          day: day,
			},
		});
	}
  }

  console.log('✅ Seed verisi başarıyla yüklendi!');
  console.log(`👥 ${createdUsers.length} kullanıcı oluşturuldu`);
  console.log(`📚 ${languages.length} dil eklendi`);
  console.log('🔐 Varsayılan parola: "' + defaultPassword + '"');
  console.log('🎯 Test için hazır!');
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e);
    process.exit(1);
	})
  .finally(async () => {
		await prisma.$disconnect();
	});