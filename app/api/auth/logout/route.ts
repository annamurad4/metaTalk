import { NextResponse } from 'next/server';
// Logout'u GET ile tetikleyebilelim (Link üzerinden). CSRF anlamlı değil çünkü state-changing ama sadece kendi cookie'lerini siliyoruz ve HttpOnly olduğu için CSRF etkisi sınırlı; yine de POST için CSRF doğrulaması yapıyoruz.
import { validateCsrf } from '@/lib/csrf';
import { cookies } from 'next/headers';
import { revokeSessionByToken, clearAuthCookies } from '@/lib/auth';

async function logoutResponse(request: Request) {
	const cookieStore = await cookies();
	const rt = cookieStore.get('refresh_token')?.value;
	if (rt) {
		await revokeSessionByToken(rt);
	}
	await clearAuthCookies();
	return NextResponse.redirect(new URL('/auth/login', request.url));
}

export async function POST(request: Request) {
    if (!(await validateCsrf(request))) {
		return NextResponse.json({ success: false, error: 'CSRF doğrulaması başarısız' }, { status: 403 });
	}
	return logoutResponse(request);
}

export async function GET(request: Request) {
	return logoutResponse(request);
}


