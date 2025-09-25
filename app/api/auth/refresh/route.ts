import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { prisma } from '@/lib/db';
import { hashTokenSha256 } from '@/lib/crypto';
import { signAccessToken } from '@/lib/jwt';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    if (!refreshToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const tokenHash = hashTokenSha256(refreshToken);
    const session = await prisma.userSession.findFirst({
      where: { token_hash: tokenHash, revoked_at: null },
      include: { user: true },
    });
    if (!session) {
      // Token yok ya da revoke edilmiş
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    if (new Date() > session.expires_at) {
      await prisma.userSession.update({ where: { id: session.id }, data: { revoked_at: new Date() } });
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
      return NextResponse.json({ success: false, error: 'Session expired' }, { status: 401 });
    }

    // Sliding refresh: aktif kullanımda refresh cookie maxAge’ini yenileyelim (uzatmayacağız, sadece tarayıcıya tekrar yazacağız)
    const user = session.user;
    const access = await signAccessToken({ sub: user.id, email: user.email });

    const res = NextResponse.json({ success: true });
    
    // Çerezleri güncelle
    const isProd = process.env.NODE_ENV === 'production';
    
    // Access token'ı güncelle
    res.cookies.set('access_token', access, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 10 * 60,
    });
    
    // Refresh token'ı yeniden ekle (sliding expiration)
    // Session süresi kadar refresh token süresini de uzat (maxAge değerini hesapla)
    const expiresInMs = session.expires_at.getTime() - new Date().getTime();
    const maxAgeSec = Math.floor(expiresInMs / 1000);
    
    if (maxAgeSec > 0) {
      res.cookies.set('refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: maxAgeSec,
      });
    }
    
    console.log('Refresh başarılı, yeni access token oluşturuldu.');
    return res;
  } catch (error) {
    console.error('refresh error', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}


