const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const LANGS = [
  { code: 'en', name: 'İngilizce' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'es', name: 'İspanyolca' },
  { code: 'de', name: 'Almanca' },
  { code: 'fr', name: 'Fransızca' },
  { code: 'it', name: 'İtalyanca' },
  { code: 'pt', name: 'Portekizce' },
  { code: 'ru', name: 'Rusça' },
  { code: 'ja', name: 'Japonca' },
  { code: 'ko', name: 'Korece' },
  { code: 'zh', name: 'Çince' },
  { code: 'ar', name: 'Arapça' },
];

async function main() {
  console.log('Dil verilerini yüklüyorum...');
  
  // Önce tüm dilleri temizleyelim (varsayılan dillerden emin olmak için)
  try {
    await prisma.userLanguage.deleteMany({});
    await prisma.language.deleteMany({});
  } catch (error) {
    console.log('Temizleme hatası (önemli değil):', error.message);
  }
  
  for (const l of LANGS) {
    console.log(`Ekleniyor: ${l.code} - ${l.name}`);
    await prisma.language.create({
      data: { 
        code: l.code, 
        name: l.name 
      },
    });
  }
  console.log('Tüm diller başarıyla eklendi.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });