import { NextResponse } from 'next/server';
import { ensureCsrfCookie } from '@/lib/csrf';

export async function GET() {
  try {
    const token = await ensureCsrfCookie();
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json({ success: false, error: 'CSRF token oluşturulamadı' }, { status: 500 });
  }
}