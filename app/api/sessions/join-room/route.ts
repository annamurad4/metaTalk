import { NextRequest, NextResponse } from 'next/server';
import { dailyService } from '@/lib/daily';
import { verifyAccessToken, JWTPayload } from '@/lib/jwt';

/**
 * POST /api/sessions/join-room
 * Mevcut bir video görüşme odasına katılım token'ı oluşturur
 */
export async function POST(request: NextRequest) {
  try {
    // Kullanıcı doğrulama
    const token = request.cookies.get('access_token')?.value;
    let userId: string | null = null;
    if (token) {
      const payload = await verifyAccessToken<JWTPayload>(token);
      if (payload?.userId) userId = payload.userId;
    }
    // Test aşaması: oturum yoksa anonim kullanıcıyla devam et
    if (!userId) {
      userId = `anon_${Math.random().toString(36).slice(2, 10)}`;
    }

    const body = await request.json();
    const { roomName, duration = 30 } = body; // 30 dakika

    if (!roomName) {
      return NextResponse.json(
        { success: false, error: 'Oda adı gerekli' },
        { status: 400 }
      );
    }

    // Oda var mı kontrol et
    let room = await dailyService.getRoom(roomName);
    if (!room) {
      // Eğer oda yoksa ephemeral oda oluştur (private, 30dk)
      room = await dailyService.createRoom({
        name: roomName,
        maxParticipants: 2,
        duration: 30,
        enableChat: true,
        enableRecording: false,
        enableScreenshare: true,
        enableKnocking: false,
        enablePrejoinUI: true,
      });
    }

    // Katılım token'ı oluştur
    const meetingToken = await dailyService.createMeetingToken(
      roomName,
      userId,
      false, // katılımcı
      duration
    );

    return NextResponse.json({
      success: true,
      data: {
        room: {
          id: room.id,
          name: room.name,
          url: room.url,
        },
        meetingToken: meetingToken.token,
        expiresAt: new Date(Date.now() + duration * 60 * 1000).toISOString(),
      },
    });

  } catch (error) {
    console.error('Join room failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Odaya katılım sağlanamadı' 
      },
      { status: 500 }
    );
  }
}

