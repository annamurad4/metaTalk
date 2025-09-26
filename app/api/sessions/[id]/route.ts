/**
 * Belirli bir oturum için API endpoint'leri
 * Tekil oturum işlemleri için API rotaları
 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/jwt';

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
 * Belirli bir oturumu getir
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }
    
    const sessionId = params.id;
    
    // Oturumu getir
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
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
        messages: {
          orderBy: { created_at: 'asc' },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                surname: true,
                avatar_url: true,
              },
            },
          },
        },
      },
    });
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı' },
        { status: 404 }
      );
    }
    
    // Kullanıcının bu oturuma erişim yetkisi var mı?
    if (session.learner_id !== userId && session.teacher_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Bu oturuma erişim yetkiniz yok' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error('Oturum getirme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Oturum getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

/**
 * Oturumu güncelle
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }
    
    const sessionId = params.id;
    
    // Oturumu kontrol et
    const existingSession = await prisma.session.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        learner_id: true,
        teacher_id: true,
        status: true,
      },
    });
    
    if (!existingSession) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı' },
        { status: 404 }
      );
    }
    
    // Kullanıcının bu oturumu güncelleme yetkisi var mı?
    if (existingSession.learner_id !== userId && existingSession.teacher_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Bu oturumu güncelleme yetkiniz yok' },
        { status: 403 }
      );
    }
    
    // İstek gövdesini doğrula
    const body = await request.json();
    const validationResult = updateSessionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz veri', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const updateData: any = {};
    
    // Güncelleme verilerini hazırla
    if (validationResult.data.scheduledAt) {
      updateData.scheduled_at = new Date(validationResult.data.scheduledAt);
    }
    
    if (validationResult.data.status) {
      updateData.status = validationResult.data.status;
    }
    
    if (validationResult.data.dailyRoomUrl) {
      updateData.daily_room_url = validationResult.data.dailyRoomUrl;
    }
    
    // Oturumu güncelle
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: updateData,
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
    
    // Oturum tamamlandıysa kredi işlemleri
    if (validationResult.data.status === 'completed' && existingSession.status !== 'completed') {
      // Öğrenen kullanıcıdan kredi düş
      await prisma.user.update({
        where: { id: updatedSession.learner_id },
        data: { credits: { decrement: 1 } },
      });
      
      // Öğreten kullanıcıya kredi ekle
      await prisma.user.update({
        where: { id: updatedSession.teacher_id },
        data: { credits: { increment: 1 } },
      });
    }
    
    return NextResponse.json({
      success: true,
      data: updatedSession,
      message: 'Oturum başarıyla güncellendi',
    });
  } catch (error) {
    console.error('Oturum güncelleme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Oturum güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

/**
 * Oturumu iptal et
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }
    
    const sessionId = params.id;
    
    // Oturumu kontrol et
    const existingSession = await prisma.session.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        learner_id: true,
        teacher_id: true,
        status: true,
      },
    });
    
    if (!existingSession) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı' },
        { status: 404 }
      );
    }
    
    // Kullanıcının bu oturumu iptal etme yetkisi var mı?
    if (existingSession.learner_id !== userId && existingSession.teacher_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Bu oturumu iptal etme yetkiniz yok' },
        { status: 403 }
      );
    }
    
    // Oturumu iptal et (silmek yerine durumunu 'cancelled' olarak güncelle)
    await prisma.session.update({
      where: { id: sessionId },
      data: { status: 'cancelled' },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Oturum başarıyla iptal edildi',
    });
  } catch (error) {
    console.error('Oturum iptal etme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Oturum iptal edilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
