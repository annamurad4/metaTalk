import { NextResponse } from 'next/server';
import { validateCsrf } from '@/lib/csrf';
import { schoolEmailSchema } from '@/lib/validation';
import { canSend, generateOtp, markSend, setOtp } from '@/lib/otp';
import { prisma } from '@/lib/db';
import { rateLimitOk } from '@/lib/rate-limit';
import { sendOtpEmail } from '@/lib/email';

export async function POST(request: Request) {
	try {
        if (!(await validateCsrf(request))) {
            return NextResponse.json({ success: false, error: 'CSRF doğrulaması başarısız' }, { status: 403 });
        }
        const { email, mode, rememberMe } = await request.json();
		const ip = request.headers.get('x-forwarded-for') || 'local';
		if (!rateLimitOk(`otp:${ip}`)) {
			return NextResponse.json({ success: false, error: 'Çok fazla istek' }, { status: 429 });
		}
		const parsed = schoolEmailSchema.safeParse(email);
		if (!parsed.success) {
			return NextResponse.json({ success: false, error: 'Geçersiz e-posta' }, { status: 400 });
		}
		const normalized = parsed.data;

        const flow: 'login' | 'register' = mode === 'login' ? 'login' : 'register';
        const rm: boolean = rememberMe !== false; // default true
		if (flow === 'login') {
			const exists = await prisma.user.findUnique({ where: { email: normalized } });
			if (!exists) {
				return NextResponse.json({ success: false, error: 'Hesap bulunamadı. Lütfen kayıt olun.' }, { status: 404 });
			}
		} else {
			const exists = await prisma.user.findUnique({ where: { email: normalized } });
			if (exists) {
				return NextResponse.json({ success: false, error: 'Bu e-posta ile hesap mevcut. Lütfen giriş yapın.' }, { status: 409 });
			}
		}
		if (!canSend(normalized)) {
			return NextResponse.json({ success: false, error: 'Çok fazla deneme, lütfen sonra tekrar deneyin' }, { status: 429 });
		}
		const code = generateOtp();
		setOtp(normalized, code);
		markSend(normalized);


		// E-postayı gönder (konfigürasyon yoksa log'a düşer). UI hızlı dönsün diye beklemiyoruz.
		void sendOtpEmail(normalized, code).catch((err) => {
			console.error('OTP e-posta gönderimi başarısız:', err);
		});

        return NextResponse.json({ success: true, rememberMe: rm });
	} catch (error) {
		console.error('send-code error', error);
		return NextResponse.json({ success: false, error: 'Beklenmeyen hata' }, { status: 500 });
	}
}



