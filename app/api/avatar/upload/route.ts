import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary ayarları
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// Kullanıcıyı doğrula
async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (!token) return null;
    const payload = await verifyAccessToken<{ sub: string }>(token);
    return payload?.sub || null;
  } catch (error) {
    console.error('Token işleme hatası:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Kullanıcı doğrulama
    const userId = await getUserFromToken();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Oturum bulunamadı' }, { status: 401 });
    }
    
    // Formdaki dosyayı al
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'Dosya bulunamadı' }, { status: 400 });
    }
    
    // Dosya tipini kontrol et
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Sadece görüntü dosyaları yüklenebilir' }, { status: 400 });
    }
    
    // Dosya boyutunu kontrol et (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'Dosya boyutu 2MB\'dan küçük olmalıdır' }, { status: 400 });
    }

    // Dosyayı Buffer'a çevir
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Cloudinary'ye yükle
    const uploadPromise = new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'metatalk/avatars',
          transformation: [
            { width: 300, height: 300, crop: 'fill', gravity: 'face' },
            { quality: 'auto' }
          ],
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Yükleme başarısız'));
          }
          resolve(result);
        }
      );
      
      // Buffer'ı upload stream'e yaz
      const Readable = require('stream').Readable;
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
    
    const uploadResult = await uploadPromise;
    
    // Veritabanında kullanıcı profilini güncelle
    await prisma.user.update({
      where: { id: userId },
      data: { avatar_url: uploadResult.secure_url }
    });
    
    return NextResponse.json({ 
      success: true, 
      url: uploadResult.secure_url
    });
  } catch (error) {
    console.error('Avatar yükleme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Avatar yüklenemedi' 
    }, { status: 500 });
  }
}
