import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PATHS = ['/profile', '/matches', '/sessions', '/admin'];

export function middleware(req: NextRequest) {
	// Geliştirme ortamında profil sayfasına erişime izin ver (TEST için)
	if (process.env.NODE_ENV === 'development' && req.nextUrl.pathname === '/test-login') {
		return NextResponse.next();
	}

	const { pathname } = req.nextUrl;
	const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
	if (!isProtected) return NextResponse.next();
    const res = NextResponse.next();

    // CSRF çerezi yoksa oluştur (edge runtime, Web Crypto)
    const csrf = req.cookies.get('csrf_token')?.value;
    if (!csrf) {
        const arr = new Uint8Array(16);
        crypto.getRandomValues(arr);
        const token = btoa(String.fromCharCode(...arr))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+/g, '');
        res.cookies.set('csrf_token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60,
        });
    }

    const token = req.cookies.get('access_token')?.value;
    if (token) {
        return res;
    }
    // Access yoksa; refresh varsa izin ver (sayfa içi istek access üretecek)
    const refresh = req.cookies.get('refresh_token')?.value;
    if (!refresh) {
        const url = req.nextUrl.clone();
        url.pathname = '/auth/login';
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }
    return res;
}

export const config = {
	matcher: ['/profile/:path*', '/matches/:path*', '/sessions/:path*', '/admin/:path*'],
};


