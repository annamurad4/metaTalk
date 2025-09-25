/**
 * Eşleştirme verilerini oluşturan seed scripti
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Eşleştirme verileri oluşturuluyor...');
  
  // 1. Test kullanıcılarını al
  const users = await prisma.user.findMany();
  if (users.length < 2) {
    console.error('❌ En az 2 kullanıcı olmalıdır!');
    return;
  }
  
  // 2. Dilleri al
  const languages = await prisma.language.findMany();
  if (languages.length === 0) {
    console.error('❌ Dil bulunamadı!');
    return;
  }
  
  // 3. Kullanıcı dillerini al
  const userLanguages = await prisma.userLanguage.findMany({
    include: {
      user: true,
      language: true
    }
  });
  
  // 4. Her kullanıcı için diğer kullanıcılarla eşleşme oluştur
  console.log('📊 MatchingSuggestion tablosunu dolduruluyor...');
  let createdCount = 0;
  
  for (const user of users) {
    // Kullanıcının öğrenmek istediği diller
    const userLearnLanguages = userLanguages.filter(
      ul => ul.user_id === user.id && ul.role === 'learn'
    );
    
    // Bu diller için öğretmen bul
    for (const learnLang of userLearnLanguages) {
      // Bu dili öğretebilen kullanıcılar
      const potentialTeachers = userLanguages.filter(
        ul => ul.user_id !== user.id && 
        ul.role === 'teach' && 
        ul.language_id === learnLang.language_id
      );
      
      // Eşleşme oluştur
      for (const teachLang of potentialTeachers) {
        const teacherId = teachLang.user_id;
        const teacherUser = users.find(u => u.id === teacherId);
        
        if (!teacherUser) continue;
        
        // Ortak günleri hesapla
        const userDays = await prisma.userAvailability.findMany({
          where: { user_id: user.id }
        });
        
        const teacherDays = await prisma.userAvailability.findMany({
          where: { user_id: teacherId }
        });
        
        const userDayNumbers = userDays.map(d => d.day);
        const teacherDayNumbers = teacherDays.map(d => d.day);
        
        const commonDays = userDayNumbers.filter(d => teacherDayNumbers.includes(d));
        
        // Karşılıklı fayda kontrolü
        const userTeachLanguages = userLanguages.filter(
          ul => ul.user_id === user.id && ul.role === 'teach'
        );
        
        const teacherLearnLanguages = userLanguages.filter(
          ul => ul.user_id === teacherId && ul.role === 'learn'
        );
        
        const isMutual = userTeachLanguages.some(utl =>
          teacherLearnLanguages.some(tll => tll.language_id === utl.language_id)
        );
        
        // Eşleşme puanı hesapla
        const timeScore = Math.min(commonDays.length * 2, 10);
        const mutualScore = isMutual ? 10 : 5;
        const score = parseFloat(((timeScore * 0.7) + (mutualScore * 0.3)).toFixed(2));
        
        // Eşleşmeyi kaydet
        if (score > 0) {
          try {
            await prisma.matchingSuggestion.upsert({
              where: {
                learner_id_teacher_id_language_id: {
                  learner_id: user.id,
                  teacher_id: teacherId,
                  language_id: learnLang.language_id,
                },
              },
              update: {
                common_days: JSON.stringify(commonDays),
                common_day_count: commonDays.length,
                match_score: score,
                is_mutual: isMutual,
              },
              create: {
                learner_id: user.id,
                teacher_id: teacherId,
                language_id: learnLang.language_id,
                common_days: JSON.stringify(commonDays),
                common_day_count: commonDays.length,
                match_score: score,
                is_mutual: isMutual,
              },
            });
            createdCount++;
          } catch (error) {
            console.error(`❌ Eşleşme oluşturulamadı: ${error}`);
          }
        }
      }
    }
  }
  
  console.log(`✅ Toplam ${createdCount} eşleşme oluşturuldu!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
