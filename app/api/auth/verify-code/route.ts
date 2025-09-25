import { NextResponse } from 'next/server';
import { otpSchema, schoolEmailSchema } from '@/lib/validation';
import { verifyOtp } from '@/lib/otp';
import { prisma } from '@/lib/db';
import { validateCsrf } from '@/lib/csrf';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
	try {
    if (!(await validateCsrf(request))) {
            return NextResponse.json({ success: false, error: 'CSRF doğrulaması başarısız' }, { status: 403 });
        }
        const { email, code, firstName, lastName, rememberMe } = await request.json();
		const emailOk = schoolEmailSchema.safeParse(email);
		const otpOk = otpSchema.safeParse(code);
		if (!emailOk.success || !otpOk.success) {
			return NextResponse.json({ success: false, error: 'Geçersiz istek' }, { status: 400 });
		}
		const status = verifyOtp(emailOk.data, otpOk.data);
		if (status !== 'ok') {
			const map: Record<string, number> = { expired: 400, invalid: 400, locked: 429 };
			return NextResponse.json({ success: false, error: status }, { status: map[status] ?? 400 });
		}
		// İsim/soyisim temizleme (opsiyonel)
		const name = typeof firstName === 'string' ? firstName.trim().slice(0, 100) : undefined;
		const surname = typeof lastName === 'string' ? lastName.trim().slice(0, 100) : undefined;

		// Kullanıcıyı oluştur/işaretle ve varsa isim/soyisim kaydet
		const user = await prisma.user.upsert({
			where: { email: emailOk.data },
			update: { 
				email_verified: true,
				...(name ? { name } : {}),
				...(surname ? { surname } : {}),
			},
			create: { 
				email: emailOk.data, 
				email_verified: true,
				name: name ?? null,
				surname: surname ?? null,
			},
		});
        const shouldSetPassword = !user.password_hash;
        const ua = request.headers.get('user-agent');
        const ip = request.headers.get('x-forwarded-for') || null;
        const rm = rememberMe !== false; // default true
        await createSession({ userId: user.id, email: user.email, userAgent: ua, ipAddress: ip, rememberMe: rm });
        return NextResponse.json({ success: true, redirectTo: shouldSetPassword ? '/auth/set-password' : '/profile' });
	} catch (error) {
		console.error('verify-code error', error);
		return NextResponse.json({ success: false, error: 'Beklenmeyen hata' }, { status: 500 });
	}
}


