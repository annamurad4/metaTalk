/**
 * Öğrenme amaçlı eşleştirme API'si
 * Kullanıcıya uygun öğretmenleri bulan endpoint
 */
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/jwt';
import { findLearningMatches } from '@/lib/matching';

/**
 * Kullanıcının kullanabileceği öğretmenleri getirir
 * (Kullanıcı = öğrenen, eşleşme = öğretmen)
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

    // Eşleşmeleri bul (kullanıcı öğrenen rolünde)
    const matchResults = await findLearningMatches(payload.sub);
    
    console.log(`[matches/learning] userId: ${payload.sub}, sonuç: `, 
                JSON.stringify({
                  success: matchResults.success,
                  count: matchResults.data?.length || 0
                })
    );
    
    return Response.json(matchResults);

  } catch (error) {
    console.error('Eşleşme hatası:', error);
    return Response.json(
      { success: false, error: 'Eşleşmeler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
