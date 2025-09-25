import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { generateSecureToken, hashTokenSha256 } from '@/lib/crypto';
import { signAccessToken } from '@/lib/jwt';

const isProd = process.env.NODE_ENV === 'production';

export type CreateSessionOptions = {
  userId: string;
  email: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  rememberMe?: boolean; // true => 14 gün, false => 1 gün
};

export async function createSession({ userId, email, userAgent, ipAddress, rememberMe = true }: CreateSessionOptions) {
  const refreshToken = generateSecureToken(48);
  const tokenHash = hashTokenSha256(refreshToken);
  const now = new Date();
  const ttlDays = rememberMe ? 14 : 1;
  const expiresAt = new Date(now.getTime() + ttlDays * 24 * 60 * 60 * 1000);

  await prisma.userSession.create({
    data: {
      user_id: userId,
      token_hash: tokenHash,
      user_agent: userAgent || undefined,
      ip_address: ipAddress || undefined,
      expires_at: expiresAt,
    },
  });

  const accessToken = await signAccessToken({ sub: userId, email });

  const cookieStore = await cookies();
  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60, // 10 dakika
  });
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: ttlDays * 24 * 60 * 60,
  });
}

export async function revokeSessionByToken(refreshToken: string): Promise<void> {
  const tokenHash = hashTokenSha256(refreshToken);
  await prisma.userSession.updateMany({
    where: { token_hash: tokenHash, revoked_at: null },
    data: { revoked_at: new Date() },
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set('access_token', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  cookieStore.set('refresh_token', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}


