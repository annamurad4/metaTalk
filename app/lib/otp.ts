// Basit in-memory OTP deposu (MVP aşaması)
// Not: Prod için Redis gibi bir dış depo tercih edilmeli

type OtpRecord = {
	code: string;
	expiresAt: number; // epoch ms
	attempts: number;
};

const OTP_TTL_MS = 5 * 60 * 1000; // 5 dakika
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 dakika
const MAX_ATTEMPTS = 3;

// Hot-reload sırasında veri kaybını engellemek için globalThis üzerinde sakla
const globalForOtp = globalThis as unknown as {
  emailToOtp?: Map<string, OtpRecord>;
  emailToWindow?: Map<string, { start: number; count: number }>;
};

const emailToOtp = globalForOtp.emailToOtp ?? new Map<string, OtpRecord>();
const emailToWindow = globalForOtp.emailToWindow ?? new Map<string, { start: number; count: number }>();

if (process.env.NODE_ENV !== 'production') {
  globalForOtp.emailToOtp = emailToOtp;
  globalForOtp.emailToWindow = emailToWindow;
}

export function generateOtp(): string {
	return Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, '0');
}

export function setOtp(email: string, code: string): void {
	const record: OtpRecord = {
		code,
		expiresAt: Date.now() + OTP_TTL_MS,
		attempts: 0,
	};
	emailToOtp.set(email, record);
}

export function canSend(email: string): boolean {
	const now = Date.now();
	const win = emailToWindow.get(email);
	if (!win || now - win.start > RATE_WINDOW_MS) {
		emailToWindow.set(email, { start: now, count: 0 });
		return true;
	}
	return win.count < MAX_ATTEMPTS;
}

export function markSend(email: string): void {
	const now = Date.now();
	const win = emailToWindow.get(email);
	if (!win || now - win.start > RATE_WINDOW_MS) {
		emailToWindow.set(email, { start: now, count: 1 });
		return;
	}
	win.count += 1;
}

export function verifyOtp(email: string, code: string): 'ok' | 'expired' | 'invalid' | 'locked' {
	const rec = emailToOtp.get(email);
	if (!rec) return 'expired';
	if (Date.now() > rec.expiresAt) {
		emailToOtp.delete(email);
		return 'expired';
	}
	if (rec.attempts >= MAX_ATTEMPTS) return 'locked';
	if (rec.code !== code) {
		rec.attempts += 1;
		return rec.attempts >= MAX_ATTEMPTS ? 'locked' : 'invalid';
	}
	// başarılı
	emailToOtp.delete(email);
	return 'ok';
}


