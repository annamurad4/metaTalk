import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

export async function GET() {
  try {
    // Manuel CSRF token oluştur
    const token = randomBytes(16).toString('base64url');
    
    // Cookie'yi ayarla
    const cookieStore = await cookies();
    await cookieStore.set('csrf_token', token, {
      httpOnly: false, // JS'den erişilebilir olmalı
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 1 gün
    });
    
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('CSRF token ayarlama hatası:', error);
    return NextResponse.json({ success: false, error: 'CSRF token oluşturulamadı' }, { status: 500 });
  }
}


