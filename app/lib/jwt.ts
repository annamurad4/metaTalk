import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'dev-secret');

export interface AccessTokenPayload {
    sub: string; // user id
    email: string;
    [key: string]: unknown;
}

export const ACCESS_TOKEN_TTL = '10m'; // MVP: 10 dakika

export async function signAccessToken(payload: AccessTokenPayload, expiresIn: string = ACCESS_TOKEN_TTL) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);
}

export async function verifyAccessToken<T = AccessTokenPayload>(token: string): Promise<T | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as T;
    } catch {
        return null;
    }
}

