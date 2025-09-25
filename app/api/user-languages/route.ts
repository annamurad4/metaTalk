import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/jwt';
import { userLanguagesUpdateSchema } from '@/lib/validation';

async function getUserId() {
	try {
		const token = (await cookies()).get('access_token')?.value;
		console.log('[user-languages] Token bulundu:', token ? 'Evet' : 'Hayır');
		
		if (!token) return null;
		
		const payload = await verifyAccessToken<{ sub: string }>(token);
		console.log('[user-languages] Token payload:', payload);
		
		// Token geçerliyse kullanıcının varlığını kontrol et
		if (payload?.sub) {
			const user = await prisma.user.findUnique({
				where: { id: payload.sub }
			});
			
			if (!user) {
				console.error('[user-languages] Kullanıcı bulunamadı:', payload.sub);
				return null;
			}
			
			console.log('[user-languages] Kullanıcı bulundu:', user.id);
		}
		
		return payload?.sub ?? null;
	} catch (error) {
		console.error('[user-languages] Token işleme hatası:', error);
		return null;
	}
}

export async function GET() {
	const userId = await getUserId();
	if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
	const list = await prisma.userLanguage.findMany({
		where: { user_id: userId },
		include: { language: true },
		orderBy: [{ role: 'asc' }, { updated_at: 'desc' }],
	});
	return NextResponse.json({ success: true, data: list });
}

export async function PUT(request: Request) {
	const userId = await getUserId();
	if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
	try {
		const body = await request.json();
		const parsed = userLanguagesUpdateSchema.safeParse(body);
		if (!parsed.success) return NextResponse.json({ success: false, error: 'Geçersiz veri' }, { status: 400 });

		const { role, items } = parsed.data;
		// Mevcut rolleri silip yeniden oluşturmak yerine upsert kullanıyoruz
		for (const it of items) {
			const lang = await prisma.language.findUnique({ where: { code: it.code } });
			if (!lang) continue;
			await prisma.userLanguage.upsert({
				where: { user_id_language_id_role: { user_id: userId, language_id: lang.id, role } },
				update: { level: it.level as any },
				create: { user_id: userId, language_id: lang.id, role, level: it.level as any },
			});
		}
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('user-languages update error', error);
		return NextResponse.json({ success: false, error: 'Beklenmeyen hata' }, { status: 500 });
	}
}


