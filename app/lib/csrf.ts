import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

const isProd = process.env.NODE_ENV === 'production';

export async function ensureCsrfCookie() {
  const store = await cookies();
  const existing = store.get('csrf_token')?.value;
  if (existing) return existing;
  const token = randomBytes(16).toString('base64url');
  store.set('csrf_token', token, {
    httpOnly: false, // JS erişimli; form/headers'a koyacağız
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60,
  });
  return token;
}

export async function validateCsrf(request: Request): Promise<boolean> {
  const store = await cookies();
  const cookieToken = store.get('csrf_token')?.value;
  const headerToken = request.headers.get('x-csrf-token');
  
  console.log('CSRF validation - Cookie token:', cookieToken);
  console.log('CSRF validation - Header token:', headerToken);
  
  // Geliştirme modunda CSRF kontrolünü bypass et
  if (process.env.NODE_ENV === 'development' && process.env.DISABLE_CSRF === 'true') {
    console.log('Development mode: CSRF validation bypassed');
    return true;
  }
  
  if (!cookieToken || !headerToken) {
    console.log('CSRF validation failed: Missing token');
    return false;
  }
  
  return cookieToken === headerToken;
}



