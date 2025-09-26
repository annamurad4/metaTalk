import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/db';
import { profileUpdateSchema } from '@/lib/validation';

async function getUserFromCookie() {
	try {
    const token = (await cookies()).get('access_token')?.value;
		console.log('Token bulundu:', token ? 'Evet' : 'Hayır');
		
		if (!token) return null;
		
		const payload = await verifyAccessToken<{ sub: string }>(token);
		console.log('Token payload:', payload);
		
		return payload?.sub ?? null;
	} catch (error) {
		console.error('Token işleme hatası:', error);
		return null;
	}
}

export async function GET() {
	const userId = await getUserFromCookie();
	if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
	
	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: {
			user_languages: {
				include: {
					language: true,
				},
			},
			user_availability: true, // Müsait günleri de dahil et
		},
	});

	if (!user) return NextResponse.json({ success: false, error: 'Kullanıcı bulunamadı' }, { status: 404 });
	
	// Kullanıcının aktif gün sayısını hesapla
	const activeDays = Math.min(
		Math.ceil((Date.now() - user.created_at.getTime()) / (1000 * 60 * 60 * 24)),
		1
	);
	
	// Dil verilerini düzenleme
	const languages = user.user_languages.map(ul => ({
		id: ul.id,
		language_id: ul.language_id,
		language: ul.language.name,
		code: ul.language.code,
		level: ul.level,
		role: ul.role,
	}));
	
	// Aktif öğrenilen ve öğretilen dil sayılarını hesapla
	const activeLanguagesLearned = user.user_languages.filter(ul => ul.role === 'learn').length;
	const activeLanguagesTaught = user.user_languages.filter(ul => ul.role === 'teach').length;
	
	const formattedUser = {
		id: user.id,
		email: user.email,
		name: user.name,
		surname: user.surname,
		department: user.department,
		class_year: user.class_year,
		avatar_url: user.avatar_url,
		password_set: !!user.password_hash,
		credits: user.credits, // Kredi bilgisini ekledik
		created_at: user.created_at,
		updated_at: user.updated_at,
		languages,
		available_days: user.user_availability.map(ua => ua.day), // Müsait günleri ekledik
		stats: {
			total_sessions: user.total_sessions,
			rating: user.average_rating,
			languages_learned: activeLanguagesLearned,
			languages_taught: activeLanguagesTaught,
		}
	};
	
	return NextResponse.json({ success: true, user: formattedUser });
}

export async function PUT(request: Request) {
	const userId = await getUserFromCookie();
	if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
	try {
		const body = await request.json();
		const parsed = profileUpdateSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json({ success: false, error: 'Geçersiz veri' }, { status: 400 });
		}
		const user = await prisma.user.update({ where: { id: userId }, data: parsed.data });
		return NextResponse.json({ success: true, data: user });
	} catch (error) {
		console.error('profile update error', error);
		return NextResponse.json({ success: false, error: 'Beklenmeyen hata' }, { status: 500 });
	}
}



