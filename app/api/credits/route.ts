/**
 * Kredi yönetimi için API endpoint'i
 */
import { cookies } from 'next/headers';
import { z } from 'zod';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/db';
import { convertTeachingToLearningCredits } from '@/lib/matching';

// Kredi dönüşüm şema kontrolü
const convertSchema = z.object({
  amount: z.number().min(1).default(1), // Varsayılan: 1 öğretme kredisi = 1 öğrenme kredisi
});

/**
 * Kullanıcının kredi bilgilerini getirir
 */
export async function GET() {
  try {
    // Oturum kontrolü
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (!token) {
      return Response.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }

    const payload = await verifyAccessToken<{ sub: string }>(token);
    if (!payload?.sub) {
      return Response.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }

    // Kredi bilgilerini getir
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        credits: true,
      },
    });

    if (!user) {
      return Response.json({ success: false, error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: {
        credits: user.credits,
      },
    });
  } catch (error) {
    console.error('Kredi bilgileri hatası:', error);
    return Response.json(
      { success: false, error: 'Kredi bilgileri yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

/**
 * Öğretme kredilerini öğrenme kredilerine çevirir
 */
export async function POST(req: Request) {
  try {
    // Oturum kontrolü
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (!token) {
      return Response.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }

    const payload = await verifyAccessToken<{ sub: string }>(token);
    if (!payload?.sub) {
      return Response.json({ success: false, error: 'Yetkilendirme hatası' }, { status: 401 });
    }

    // Gelen veriyi doğrula
    const body = await req.json();
    const parseResult = convertSchema.safeParse(body);
    
    if (!parseResult.success) {
      return Response.json({
        success: false,
        error: 'Geçersiz veri formatı',
        details: parseResult.error.format(),
      }, { status: 400 });
    }
    
    const { amount } = parseResult.data;

    // Bu fonksiyon artık gerekli değil, ancak API'yi bozmamak için mevcut tutuyoruz
    // Tek kredi sistemi olduğundan, dönüşüm yapmamıza gerek kalmadı
    const success = true;

    // Güncel kredi bilgilerini getir
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        credits: true,
      },
    });

    return Response.json({
      success: true,
      data: {
        credits: user?.credits,
      },
      message: 'Kredi işlemi başarılı',
    });
  } catch (error) {
    console.error('Kredi dönüşüm hatası:', error);
    return Response.json(
      { success: false, error: 'Kredi dönüşümü sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
