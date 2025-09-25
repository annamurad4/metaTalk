/**
 * Eşleştirme algoritması ve yardımcı fonksiyonlar
 * MetaTalk eşleştirme sistemi için merkezi yardımcı fonksiyonlar
 */

import { prisma } from './db';

/**
 * Kullanıcı için öğrenme eşleştirmelerini bulur (kullanıcı öğrenmek isteyen rolünde)
 */
export async function findLearningMatches(userId: string) {
  console.log(`[findLearningMatches] başladı - userId: ${userId}`);

  // 1. Kullanıcının öğrenmek istediği tüm dilleri getir
  const userLearnLanguages = await prisma.userLanguage.findMany({
    where: { user_id: userId, role: 'learn' },
    include: { language: true },
  });

  console.log(`[findLearningMatches] Öğrenmek istediği diller: ${userLearnLanguages.length} adet`);

  // 2. Mevcut önbellekteki eşleşmeleri kontrol et (son hesaplamaları kullan)
  try {
    const cachedSuggestions = await prisma.matchingSuggestion.findMany({
      where: { learner_id: userId },
      orderBy: { match_score: 'desc' },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
            department: true,
            average_rating: true,
          },
        },
        language: true,
      },
      take: 20, // İlk 20 en iyi eşleşme
    });
    
    console.log(`[findLearningMatches] Önbellekteki eşleşme sayısı: ${cachedSuggestions.length}`);
    
    if (cachedSuggestions.length > 0) {
      return {
        success: true,
        data: cachedSuggestions.map(suggestion => ({
          id: suggestion.id,
          teacher: suggestion.teacher,
          language: suggestion.language,
          commonDays: JSON.parse(suggestion.common_days),
          commonDayCount: suggestion.common_day_count,
          score: suggestion.match_score,
          isMutual: suggestion.is_mutual,
        })),
      };
    }
  } catch (error) {
    console.error('[findLearningMatches] MatchingSuggestion tablosu sorgusunda hata:', error);
  }

  // 4. Önbellekte veri yoksa hesapla (gerçek uygulamada bu işlem günlük olarak ya da
  // worker ile yapılacak, burada doğrudan gösterim amaçlı hesaplıyoruz)
  const matches = [];
  console.log('[findLearningMatches] Eşleşmeler hesaplanıyor...');

  for (const learnLanguage of userLearnLanguages) {
    // Her bir öğrenilmek istenen dil için potansiyel öğretmenleri bul
    const potentialTeachers = await prisma.userLanguage.findMany({
      where: {
        role: 'teach',
        language_id: learnLanguage.language_id,
        user_id: { not: userId }, // Kendisi hariç
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true, 
            department: true,
            average_rating: true,
          }
        },
        language: true,
      },
    });

    for (const teacher of potentialTeachers) {
      // Her bir potansiyel öğretmen için eşleştirme skoru hesapla
      const matchResult = await calculateMatchScore(userId, teacher.user_id, learnLanguage.language_id);
      
      if (matchResult.score > 0) {
        matches.push({
          teacher: teacher.user,
          language: teacher.language,
          commonDays: matchResult.commonDays,
          commonDayCount: matchResult.commonDays.length,
          score: matchResult.score,
          isMutual: matchResult.isMutual,
        });
      }
    }
  }

  // 5. Sonuçları puana göre sırala ve dön
  const sortedMatches = matches.sort((a, b) => b.score - a.score).slice(0, 20);
  
  // 6. Önbelleğe kaydet (gerçek uygulamada worker'da yapılacak)
  for (const match of sortedMatches) {
    try {
      await prisma.matchingSuggestion.upsert({
        where: {
          learner_id_teacher_id_language_id: {
            learner_id: userId,
            teacher_id: match.teacher.id,
            language_id: match.language.id,
          },
        },
        update: {
          common_days: JSON.stringify(match.commonDays),
          common_day_count: match.commonDayCount,
          match_score: match.score,
          is_mutual: match.isMutual,
        },
        create: {
          learner_id: userId,
          teacher_id: match.teacher.id,
          language_id: match.language.id,
          common_days: JSON.stringify(match.commonDays),
          common_day_count: match.commonDayCount,
          match_score: match.score,
          is_mutual: match.isMutual,
        },
      });
    } catch (error) {
      console.error('[findLearningMatches] Eşleştirme kaydedilirken hata:', error);
    }
  }

  return {
    success: true,
    data: sortedMatches,
  };
}

/**
 * Kullanıcı için öğretme eşleştirmelerini bulur (kullanıcı öğretecek rolünde)
 */
export async function findTeachingMatches(userId: string) {
  console.log(`[findTeachingMatches] başladı - userId: ${userId}`);

  // 1. Kullanıcının öğretebileceği tüm dilleri getir
  const userTeachLanguages = await prisma.userLanguage.findMany({
    where: { user_id: userId, role: 'teach' },
    include: { language: true },
  });

  console.log(`[findTeachingMatches] Öğretebileceği diller: ${userTeachLanguages.length} adet`);

  // 2. Mevcut önbellekteki eşleşmeleri kontrol et (son hesaplamaları kullan)
  try {
    const cachedSuggestions = await prisma.matchingSuggestion.findMany({
      where: { teacher_id: userId },
      orderBy: { match_score: 'desc' },
      include: {
        learner: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
            department: true,
            average_rating: true,
          },
        },
        language: true,
      },
      take: 20, // İlk 20 en iyi eşleşme
    });
    
    console.log(`[findTeachingMatches] Önbellekteki eşleşme sayısı: ${cachedSuggestions.length}`);
    
    if (cachedSuggestions.length > 0) {
      return {
        success: true,
        data: cachedSuggestions.map(suggestion => ({
          id: suggestion.id,
          learner: suggestion.learner,
          language: suggestion.language,
          commonDays: JSON.parse(suggestion.common_days),
          commonDayCount: suggestion.common_day_count,
          score: suggestion.match_score,
          isMutual: suggestion.is_mutual,
        })),
      };
    }
  } catch (error) {
    console.error('[findTeachingMatches] MatchingSuggestion tablosu sorgusunda hata:', error);
  }

  // 4. Önbellekte veri yoksa hesapla
  const matches = [];
  console.log('[findTeachingMatches] Eşleşmeler hesaplanıyor...');

  for (const teachLanguage of userTeachLanguages) {
    // Her bir öğretebileceği dil için potansiyel öğrencileri bul
    const potentialLearners = await prisma.userLanguage.findMany({
      where: {
        role: 'learn',
        language_id: teachLanguage.language_id,
        user_id: { not: userId }, // Kendisi hariç
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true, 
            department: true,
            average_rating: true,
          }
        },
        language: true,
      },
    });

    for (const learner of potentialLearners) {
      // Her bir potansiyel öğrenci için eşleştirme skoru hesapla
      const matchResult = await calculateMatchScore(learner.user_id, userId, teachLanguage.language_id);
      
      if (matchResult.score > 0) {
        matches.push({
          learner: learner.user,
          language: learner.language,
          commonDays: matchResult.commonDays,
          commonDayCount: matchResult.commonDays.length,
          score: matchResult.score,
          isMutual: matchResult.isMutual,
        });
      }
    }
  }

  // 5. Sonuçları puana göre sırala ve dön
  const sortedMatches = matches.sort((a, b) => b.score - a.score).slice(0, 20);

  // 6. Önbelleğe kaydet
  for (const match of sortedMatches) {
    try {
      await prisma.matchingSuggestion.upsert({
        where: {
          learner_id_teacher_id_language_id: {
            learner_id: match.learner.id,
            teacher_id: userId,
            language_id: match.language.id,
          },
        },
        update: {
          common_days: JSON.stringify(match.commonDays),
          common_day_count: match.commonDayCount,
          match_score: match.score,
          is_mutual: match.isMutual,
        },
        create: {
          learner_id: match.learner.id,
          teacher_id: userId,
          language_id: match.language.id,
          common_days: JSON.stringify(match.commonDays),
          common_day_count: match.commonDayCount,
          match_score: match.score,
          is_mutual: match.isMutual,
        },
      });
    } catch (error) {
      console.error('[findTeachingMatches] Eşleştirme kaydedilirken hata:', error);
    }
  }

  return {
    success: true,
    data: sortedMatches,
  };
}

/**
 * İki kullanıcı arasındaki eşleştirme skorunu hesaplar
 */
export async function calculateMatchScore(
  learnerId: string,
  teacherId: string,
  languageId: string,
) {
  // 1. Ortak günleri hesapla
  const commonDays = await getCommonDays(learnerId, teacherId);
  
  // 2. Zaman uyumu puanı (her ortak gün 2 puan, maksimum 10 puan)
  const timeScore = Math.min(commonDays.length * 2, 10);
  
  // 3. Eğer hiç ortak gün yoksa, eşleşme yok demektir
  if (timeScore === 0) {
    return {
      score: 0,
      commonDays: [],
      isMutual: false,
    };
  }

  // 4. Karşılıklı fayda kontrolü
  const isMutual = await checkMutualBenefit(learnerId, teacherId);
  
  // 5. Karşılıklı fayda puanı
  const mutualScore = isMutual ? 10 : 5;
  
  // 6. Toplam skor hesaplama
  // %70 zaman uyumu + %30 karşılıklı fayda
  const totalScore = (timeScore * 0.7) + (mutualScore * 0.3);

  return {
    score: parseFloat(totalScore.toFixed(2)),
    commonDays,
    isMutual,
  };
}

/**
 * İki kullanıcının ortak müsait günlerini hesaplar
 */
export async function getCommonDays(userId1: string, userId2: string) {
  const user1Days = await prisma.userAvailability.findMany({
    where: { user_id: userId1 },
    select: { day: true },
  });
  
  const user2Days = await prisma.userAvailability.findMany({
    where: { user_id: userId2 },
    select: { day: true },
  });

  // Kullanıcı 1'in günlerini Set'e dönüştür
  const user1DaySet = new Set(user1Days.map(d => d.day));
  
  // Kesişen günleri bul
  return user2Days
    .map(d => d.day)
    .filter(day => user1DaySet.has(day))
    .sort((a, b) => a - b);
}

/**
 * İki kullanıcı arasında karşılıklı dil takası potansiyeli var mı kontrol eder
 */
export async function checkMutualBenefit(userId1: string, userId2: string) {
  // Kullanıcı 1'in öğrenmek istediği diller
  const user1LearnLanguages = await prisma.userLanguage.findMany({
    where: { user_id: userId1, role: 'learn' },
    select: { language_id: true },
  });
  
  // Kullanıcı 1'in öğretebileceği diller
  const user1TeachLanguages = await prisma.userLanguage.findMany({
    where: { user_id: userId1, role: 'teach' },
    select: { language_id: true },
  });
  
  // Kullanıcı 2'nin öğrenmek istediği diller
  const user2LearnLanguages = await prisma.userLanguage.findMany({
    where: { user_id: userId2, role: 'learn' },
    select: { language_id: true },
  });
  
  // Kullanıcı 1'in öğretebileceği dillerden herhangi biri kullanıcı 2'nin öğrenmek istediği dillerden biri mi?
  const user1TeachSet = new Set(user1TeachLanguages.map(l => l.language_id));
  const mutualBenefit = user2LearnLanguages.some(l => user1TeachSet.has(l.language_id));
  
  return mutualBenefit;
}

/**
 * Kredilerle ilgili işlemler
 */

/**
 * Kullanıcının kredilerini kontrol eder
 */
export async function checkCredit(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  
  return user !== null && user.credits > 0;
}

/**
 * Öğrenme için kredi kullanır
 */
export async function useCredit(userId: string): Promise<boolean> {
  const hasCredit = await checkCredit(userId);
  
  if (!hasCredit) {
    return false;
  }
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: { decrement: 1 },
    },
  });
  
  return true;
}

/**
 * Öğretme sonrası kredi ekler
 */
export async function addCredit(userId: string, amount = 1): Promise<boolean> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: { increment: amount },
    },
  });
  
  return true;
}

/**
 * Geçici olarak eski fonksiyon imzalarını koruyalım
 * (eski kodu bozmamak için)
 */
export async function checkLearningCredit(userId: string): Promise<boolean> {
  return checkCredit(userId);
}

export async function useLearningCredit(userId: string): Promise<boolean> {
  return useCredit(userId);
}

export async function addTeachingCredit(userId: string, amount = 1): Promise<boolean> {
  return addCredit(userId, amount);
}

export async function convertTeachingToLearningCredits(
  userId: string,
  amount = 1,
): Promise<boolean> {
  // Bu fonksiyon artık gerekli değil, ama geriye dönük uyumluluk için boş implementasyon bırakalım
  return true;
}