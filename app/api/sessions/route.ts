/**
 * Oturum API endpoint'leri
 * Görüşme oturumlarının oluşturulması ve yönetilmesi için API rotaları
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/jwt';

// Oturum oluşturma şeması
const createSessionSchema = z.object({
  teacherId: z.string().min(1),
  languageId: z.string().min(1),
});

// Oturum güncelleme şeması
const updateSessionSchema = z.object({
  scheduledAt: z.string().optional(),
  status: z.enum(['pending', 'scheduled', 'completed', 'cancelled']).optional(),
  dailyRoomUrl: z.string().optional(),
});

/**
 * Kullanıcı kimliğini çek
 */
async function getUserId() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    
    if (!token) {
      return null;
    }
    
    const payload = await verifyAccessToken<{ sub: string }>(token);
    return payload?.sub ?? null;
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return null;
  }
}

/**
 * Tüm oturumları getir
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }
    
    // URL parametrelerini al
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const role = searchParams.get('role'); // 'learner' veya 'teacher'
    
    // Filtreleri oluştur
    const filters: any = {};
    
    if (status) {
      filters.status = status;
    }
    
    if (role === 'learner') {
      filters.learner_id = userId;
    } else if (role === 'teacher') {
      filters.teacher_id = userId;
    } else {
      // Varsayılan olarak her iki roldeki oturumları getir
      filters.OR = [
        { learner_id: userId },
        { teacher_id: userId },
      ];
    }
    
    // Oturumları getir
    const sessions = await prisma.session.findMany({
      where: filters,
      include: {
        learner: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
            department: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
            department: true,
          },
        },
        language: true,
      },
      orderBy: { created_at: 'desc' },
    });
    
    return NextResponse.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error('Oturumları getirme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Oturumlar getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

/**
 * Yeni bir oturum oluştur
 */
export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }
    
    // İstek gövdesini doğrula
    const body = await request.json();
    const validationResult = createSessionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz veri', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { teacherId, languageId } = validationResult.data;
    
    // Kullanıcının öğrenme kredisi olup olmadığını kontrol et
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });
    
    if (!user || user.credits < 1) {
      return NextResponse.json(
        { success: false, error: 'Yetersiz kredi' },
        { status: 400 }
      );
    }
    
    // Yeni oturum oluştur
    const session = await prisma.session.create({
      data: {
        learner_id: userId,
        teacher_id: teacherId,
        language_id: languageId,
        status: 'pending',
      },
      include: {
        learner: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
          },
        },
        language: true,
      },
    });
    
    return NextResponse.json({
      success: true,
      data: session,
      message: 'Oturum başarıyla oluşturuldu',
    });
  } catch (error) {
    console.error('Oturum oluşturma hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Oturum oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}
