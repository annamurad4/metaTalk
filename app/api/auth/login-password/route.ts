import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { loginWithPasswordSchema } from '@/lib/validation';
import { validateCsrf } from '@/lib/csrf';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // CSRF token kontrolü
    // Geliştirme modunda CSRF kontrolünü atla
    if (process.env.NODE_ENV !== 'production') {
      console.log('Development mode: CSRF validation bypassed');
    } else {
      const csrfResult = await validateCsrf(request);
      console.log('CSRF validation result:', csrfResult);
      
      if (!csrfResult) {
        const headerToken = request.headers.get('x-csrf-token');
        console.log('Header CSRF token:', headerToken);
        return NextResponse.json({ 
          success: false, 
          error: 'CSRF doğrulaması başarısız. Lütfen sayfayı yenileyip tekrar deneyin.' 
        }, { status: 403 });
      }
    }
    
    const body = await request.json();
    console.log('Login body:', JSON.stringify(body)); // Gelen veriyi logla
    
    const parsed = loginWithPasswordSchema.safeParse(body);
    if (!parsed.success) {
      console.error('Validation error:', parsed.error);
      return NextResponse.json({ 
        success: false, 
        error: 'Geçersiz veri', 
        details: parsed.error.issues 
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user || !user.password_hash) {
      return NextResponse.json({ success: false, error: 'E-posta veya parola hatalı' }, { status: 401 });
    }

    const ok = await bcrypt.compare(parsed.data.password, user.password_hash);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'E-posta veya parola hatalı' }, { status: 401 });
    }

    const rememberMe = parsed.data.rememberMe; // Parsed data'dan al
    const ua = request.headers.get('user-agent');
    const ip = request.headers.get('x-forwarded-for') || null;
    await createSession({ userId: user.id, email: user.email, userAgent: ua, ipAddress: ip, rememberMe });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('login-password error', error);
    return NextResponse.json({ success: false, error: 'Beklenmeyen hata' }, { status: 500 });
  }
}




