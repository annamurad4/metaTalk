import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (!token) return NextResponse.json({ success: true, data: null });
    const payload = await verifyAccessToken<{ sub: string }>(token);
    if (!payload?.sub) return NextResponse.json({ success: true, data: null });
    const user = await prisma.user.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, name: true, surname: true, avatar_url: true } });
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('me error', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}


