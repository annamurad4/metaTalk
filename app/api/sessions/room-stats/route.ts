import { NextResponse } from 'next/server';
import { dailyService } from '@/lib/daily';
import { verifyAccessToken, AccessTokenPayload } from '@/lib/jwt';

/**
 * GET /api/sessions/room-stats?roomName=...
 * Oda istatistiklerini getirir
 */
export async function GET(request: Request) {
  try {
    // Kullanıcı doğrulama
    const token = (request as any).cookies?.get?.('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Oturum gerekli' },
        { status: 401 }
      );
    }

    const payload = await verifyAccessToken<AccessTokenPayload>(token);
    if (!payload?.sub) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz oturum' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const roomName = searchParams.get('roomName');

    if (!roomName) {
      return NextResponse.json(
        { success: false, error: 'Oda adı gerekli' },
        { status: 400 }
      );
    }

    // Oda istatistiklerini getir
    const stats = await dailyService.getRoomStats(roomName);

    return NextResponse.json({
      success: true,
      data: stats,
    });

  } catch (error) {
    console.error('Room stats fetch failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Oda istatistikleri alınamadı' 
      },
      { status: 500 }
    );
  }
}

