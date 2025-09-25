import { NextRequest, NextResponse } from 'next/server';
import { dailyService } from '@/lib/daily';
import { verifyAccessToken, JWTPayload } from '@/lib/jwt';

/**
 * POST /api/sessions/create-room
 * Yeni bir video görüşme odası oluşturur
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
    const { 
      maxParticipants = 2, 
      duration = 30, // 30 dakika (ephemeral room)
      enableChat = true,
      enableRecording = false,
      enableScreenshare = true 
    } = body;

    // Oda adı oluştur (unique)
    const roomName = `metatalk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Daily.co'da oda oluştur
    const room = await dailyService.createRoom({
      name: roomName,
      maxParticipants,
      duration,
      enableChat,
      enableRecording,
      enableScreenshare,
      enableKnocking: false,
      enablePrejoinUI: true,
    });

    // Toplantı token'ı oluştur (güvenli erişim için)
    const meetingToken = await dailyService.createMeetingToken(
      roomName,
      userId,
      true, // oda sahibi
      duration
    );

    return NextResponse.json({
      success: true,
      data: {
        room: {
          id: room.id,
          name: room.name,
          url: room.url,
          created_at: room.created_at,
        },
        meetingToken: meetingToken.token,
        expiresAt: new Date(Date.now() + duration * 60 * 1000).toISOString(),
      },
    });

  } catch (error) {
    console.error('Room creation failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Oda oluşturulamadı' 
      },
      { status: 500 }
    );
  }
}

