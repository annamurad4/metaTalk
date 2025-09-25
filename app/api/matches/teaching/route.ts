/**
 * Öğretme amaçlı eşleştirme API'si
 * Kullanıcının öğretebileceği öğrencileri bulan endpoint
 */
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/jwt';
import { findTeachingMatches } from '@/lib/matching';

/**
 * Kullanıcının öğretebileceği öğrencileri getirir
 * (Kullanıcı = öğreten, eşleşme = öğrenen)
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

    // Eşleşmeleri bul (kullanıcı öğreten rolünde)
    const matchResults = await findTeachingMatches(payload.sub);
    
    console.log(`[matches/teaching] userId: ${payload.sub}, sonuç: `, 
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
