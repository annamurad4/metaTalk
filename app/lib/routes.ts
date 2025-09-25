// Merkezi route tanımlarını tek yerde tutar
// Not: import ederken `@/lib/routes` ile erişim için tsconfig.paths ayarı gerekebilir

export const ROUTES = {
	// Public
	HOME: '/',
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	VERIFY_EMAIL: '/auth/verify-email',

	// Protected
	DASHBOARD: '/dashboard',
	PROFILE: '/profile',
	MATCHES: '/matches',
	SESSIONS: '/sessions',

	// Admin
	ADMIN: '/admin',
	ADMIN_USERS: '/admin/users',
	ADMIN_REPORTS: '/admin/reports',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];

// Yardımcılar
export const buildVerifyEmailRoute = (token: string) => `${ROUTES.VERIFY_EMAIL}?t=${encodeURIComponent(token)}`;
export const buildSessionRoute = (sessionId: string) => `${ROUTES.SESSIONS}/${encodeURIComponent(sessionId)}`;


