/**
 * Mesaj API endpoint'leri
 * Kullanıcı mesajlarının yönetilmesi için API rotaları
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/jwt';

// Mesaj oluşturma şeması
const createMessageSchema = z.object({
  content: z.string().min(1),
  receiverId: z.string().min(1),
  sessionId: z.string().optional(),
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
 * Kullanıcının mesajlarını getir
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }
    
    // URL parametrelerini al
    const { searchParams } = new URL(request.url);
    const otherUserId = searchParams.get('userId');
    const sessionId = searchParams.get('sessionId');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Filtreleri oluştur
    const filters: any = {};
    
    if (sessionId) {
      // Belirli bir oturumdaki mesajları getir
      filters.session_id = sessionId;
    } else if (otherUserId) {
      // Belirli bir kullanıcı ile olan mesajlaşmayı getir
      filters.OR = [
        {
          sender_id: userId,
          receiver_id: otherUserId,
        },
        {
          sender_id: otherUserId,
          receiver_id: userId,
        },
      ];
    } else {
      // Kullanıcının tüm mesajlarını getir
      filters.OR = [
        { sender_id: userId },
        { receiver_id: userId },
      ];
    }
    
    // Sadece okunmamış mesajları getir
    if (unreadOnly) {
      filters.read = false;
      filters.receiver_id = userId; // Sadece kullanıcının aldığı mesajlar
    }
    
    // Mesajları getir
    const messages = await prisma.chatMessage.findMany({
      where: filters,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      skip: offset,
      take: limit,
    });
    
    // Toplam mesaj sayısını getir
    const totalCount = await prisma.chatMessage.count({
      where: filters,
    });
    
    return NextResponse.json({
      success: true,
      data: messages,
      meta: {
        total: totalCount,
        offset,
        limit,
        hasMore: offset + messages.length < totalCount,
      },
    });
  } catch (error) {
    console.error('Mesajları getirme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Mesajlar getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

/**
 * Yeni bir mesaj oluştur
 */
export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }
    
    // İstek gövdesini doğrula
    const body = await request.json();
    const validationResult = createMessageSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz veri', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { content, receiverId, sessionId } = validationResult.data;
    
    // Mesajı oluştur
    const message = await prisma.chatMessage.create({
      data: {
        content,
        sender_id: userId,
        receiver_id: receiverId,
        session_id: sessionId || null,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar_url: true,
          },
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      data: message,
      message: 'Mesaj başarıyla gönderildi',
    });
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Mesaj gönderilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
