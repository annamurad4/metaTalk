export type SendEmailParams = {
	to: string;
	subject: string;
	text?: string;
	html?: string;
};

function getEnvOrDefault(name: string, fallback: string): string {
	const value = process.env[name];
	return value && value.trim().length > 0 ? value : fallback;
}

export function isEmailConfigured(): boolean {
	return Boolean(process.env.BREVO_API_KEY);
}

// HTTP isteği için basit timeout yardımcı fonksiyonu
async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit & { timeoutMs?: number } = {}) {
	const { timeoutMs = 8000, ...rest } = init;
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeoutMs);
	try {
		return await fetch(input, { ...rest, signal: controller.signal });
	} finally {
		clearTimeout(id);
	}
}

export async function sendEmail({ to, subject, text, html }: SendEmailParams): Promise<void> {
	// Brevo SMTP/HTTP API ile gönderim. Ek paket yüklemeden HTTP API kullanıyoruz.
	const apiKey = process.env.BREVO_API_KEY;
	const fromName = getEnvOrDefault('EMAIL_FROM_NAME', 'MetaTalk');
	const fromAddress = getEnvOrDefault('EMAIL_FROM_ADDRESS', 'no-reply@localhost');

	if (!apiKey) {
		// Konfigürasyon yoksa sessizce loglayalım (MVP davranışı)
		if (process.env.NODE_ENV !== 'production') {
			console.log('[EMAIL:DRY_RUN]', { to, subject, text, html });
		}
		return;
	}

	try {
		// 2 denemelik basit retry (429 ve 5xx durumlarında)
		let attempt = 0;
		let lastErr: unknown = null;
		while (attempt < 2) {
			attempt += 1;
			const res = await fetchWithTimeout('https://api.brevo.com/v3/smtp/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'api-key': apiKey,
				},
				body: JSON.stringify({
					sender: { name: fromName, email: fromAddress },
					to: [{ email: to }],
					subject,
					textContent: text,
					htmlContent: html,
				}),
				timeoutMs: 8000,
			});
			if (res.ok) return;
			if (res.status !== 429 && res.status < 500) {
				const body = await res.text();
				throw new Error(`Brevo API error: ${res.status} ${res.statusText} - ${body}`);
			}
			lastErr = new Error(`Brevo transient error: ${res.status}`);
			await new Promise((r) => setTimeout(r, 400 * attempt));
		}
		if (lastErr) throw lastErr;
	} catch (error) {
		// MVP: hatayı logla; çağıran üst katmanda başarıyı bloklamasın
		console.error('E-posta gönderimi başarısız:', error);
	}
}

export async function sendOtpEmail(to: string, code: string): Promise<void> {
	const subject = 'MetaTalk Giriş Doğrulama Kodunuz';
	const text = `Doğrulama kodunuz: ${code}. Bu kod 5 dakika içinde geçerlidir.`;
	const html = `<p>Doğrulama kodunuz: <strong>${code}</strong></p><p>Bu kod 5 dakika içinde geçerlidir.</p>`;
	await sendEmail({ to, subject, text, html });
}
