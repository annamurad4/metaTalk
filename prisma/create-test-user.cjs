const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Test kullanıcısı için şifre hashle
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('test123', salt);
    
    // Test kullanıcısını oluştur
    const user = await prisma.user.upsert({
      where: { email: 'test.user@std.medipol.edu.tr' },
      update: {
        password_hash,
        password_set_at: new Date(),
        email_verified: true,
      },
      create: {
        email: 'test.user@std.medipol.edu.tr',
        name: 'Test',
        surname: 'User',
        password_hash,
        password_set_at: new Date(),
        email_verified: true,
      },
    });

    console.log('Test kullanıcısı oluşturuldu:');
    console.log('Email: test.user@std.medipol.edu.tr');
    console.log('Şifre: test123');
    console.log('Kullanıcı ID:', user.id);
    
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();