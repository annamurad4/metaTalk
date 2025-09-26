import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/jwt';
import { validateCsrf } from '@/lib/csrf';

// Şifre şeması - güvenli parola kuralları
const passwordSchema = z
  .string()
  .min(6, 'Parola en az 6 karakter olmalı')
  .refine((pass) => /[A-Z]/.test(pass) || /[a-z]/.test(pass), {
    message: 'Parola en az bir harf içermeli',
  });

export async function POST(request: Request) {
  try {
    // CSRF kontrolü
    if (!(await validateCsrf(request))) {
      return NextResponse.json({ success: false, error: 'CSRF doğrulaması başarısız' }, { status: 403 });
    }

    // JWT doğrulama
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Oturum bulunamadı' }, { status: 401 });
    }

    const payload = await verifyAccessToken(token);
    
    if (!payload || !payload.sub) {
      return NextResponse.json({ success: false, error: 'Geçersiz oturum' }, { status: 401 });
    }

    // Veri doğrulama
    const { password, confirmPassword } = await request.json();
    
    // Şifre doğrulama
    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, error: 'Parolalar eşleşmiyor' }, { status: 400 });
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: passwordResult.error.issues.map(i => i.message).join(', ') 
      }, { status: 400 });
    }
    
    // Şifre hash'leme
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    // Kullanıcı güncelleme
    await prisma.user.update({
      where: { id: payload.sub },
      data: { 
        password_hash,
        password_set_at: new Date()
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('set-password error:', error);
    return NextResponse.json({ success: false, error: 'Beklenmeyen hata' }, { status: 500 });
  }
}