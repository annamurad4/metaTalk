import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/jwt';

// Müsait günler endpoint'i
// GET: Kullanıcının müsait günlerini getirir
// PUT: Kullanıcının müsait günlerini günceller

const availabilitySchema = z.object({
  days: z.array(z.number().min(1).max(7)).min(0).max(7)
});

async function getUserIdFromCookies() {
  try {
    const token = (await cookies()).get('access_token')?.value;
    if (!token) return null;
    const payload = await verifyAccessToken<{ sub: string }>(token);
    return payload?.sub ?? null;
  } catch (error) {
    console.error('[user-availability] token doğrulama hatası:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  // Oturum kontrolü
  const userId = await getUserIdFromCookies();
  if (!userId) {
    return Response.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
  }

  try {
    // Kullanıcının mevcut müsait günlerini getir
    const availabilities = await prisma.userAvailability.findMany({
      where: { user_id: userId },
    });

    console.log('[user-availability][GET]', {
      userId,
      days: availabilities.map((a) => a.day),
      count: availabilities.length,
    });

    return Response.json({ success: true, data: availabilities });
  } catch (error) {
    console.error('Müsait günler getirilemedi:', error);
    return Response.json(
      { success: false, error: 'Müsait günler getirilemedi' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  // Oturum kontrolü
  const userId = await getUserIdFromCookies();
  if (!userId) {
    return Response.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
  }

  // Request body validasyonu
  let body;
  try {
    body = availabilitySchema.parse(await req.json());
  } catch (error) {
    return Response.json(
      { success: false, error: 'Geçersiz istek formatı' },
      { status: 400 }
    );
  }

  try {
    console.log('[user-availability][PUT][incoming]', { userId, days: body.days });
    // Önce tüm müsait günleri sil
    await prisma.userAvailability.deleteMany({
      where: { user_id: userId }
    });

    // Ardından yeni günleri ekle
    if (body.days.length > 0) {
      await prisma.userAvailability.createMany({
        data: body.days.map(day => ({
          user_id: userId,
          day
        }))
      });
    }

    // Güncel müsait günleri getir
    const updatedAvailabilities = await prisma.userAvailability.findMany({
      where: { user_id: userId }
    });

    console.log('[user-availability][PUT][saved]', {
      userId,
      days: updatedAvailabilities.map((a) => a.day),
      count: updatedAvailabilities.length,
    });

    return Response.json({ 
      success: true, 
      data: updatedAvailabilities,
      message: 'Müsait günler güncellendi' 
    });
  } catch (error) {
    console.error('Müsait günler güncellenemedi:', error);
    return Response.json(
      { success: false, error: 'Müsait günler güncellenemedi' },
      { status: 500 }
    );
  }
}
