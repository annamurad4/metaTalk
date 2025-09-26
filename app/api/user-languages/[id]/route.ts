import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/jwt';

async function getUserId() {
	const token = (await cookies()).get('access_token')?.value;
	const payload = token ? await verifyAccessToken<{ sub: string }>(token) : null;
	return payload?.sub ?? null;
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const params = await context.params;
	const userId = await getUserId();
	if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
	
	try {
		const { id } = params;
		
		// Kullanıcının bu dil kaydını silmeye yetkisi var mı kontrol et
		const userLanguage = await prisma.userLanguage.findFirst({
			where: {
				id,
				user_id: userId,
			},
		});
		
		if (!userLanguage) {
			return NextResponse.json({ success: false, error: 'Dil kaydı bulunamadı' }, { status: 404 });
		}
		
		await prisma.userLanguage.delete({
			where: { id },
		});
		
		return NextResponse.json({ success: true, message: 'Dil başarıyla kaldırıldı' });
	} catch (error) {
		console.error('user-language delete error', error);
		return NextResponse.json({ success: false, error: 'Beklenmeyen hata' }, { status: 500 });
	}
}






