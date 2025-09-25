import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
	const list = await prisma.language.findMany({ orderBy: { code: 'asc' } });
	return NextResponse.json({ success: true, data: list });
}


