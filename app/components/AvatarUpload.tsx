'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Upload, Camera } from 'lucide-react';

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  onUpload: (url: string) => void;
  className?: string;
}

export default function AvatarUpload({ currentAvatarUrl, onUpload, className }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Görüntü önizlemesi oluştur
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    // Yükleme işlemi
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/avatar/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (data.success && data.url) {
        onUpload(data.url);
        // Önizlemeyi temizle çünkü artık gerçek URL'imiz var
        setPreview(null);
      } else {
        console.error('Avatar yüklenemedi:', data.error);
        // Önizlemeyi temizle
        setPreview(null);
      }
    } catch (error) {
      console.error('Avatar yüklenirken hata:', error);
      // Önizlemeyi temizle
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className={className}>
      <div className="relative group cursor-pointer">
        {/* Avatar ile yükleme alanı */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 relative border-4 border-white shadow-lg mx-auto">
          {/* Mevcut avatar veya önizleme veya default */}
          {preview ? (
            <img 
              src={preview} 
              alt="Önizleme" 
              className="w-full h-full object-cover"
            />
          ) : currentAvatarUrl ? (
            <img 
              src={currentAvatarUrl} 
              alt="Profil" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
              <span className="text-white text-4xl font-bold">?</span>
            </div>
          )}
          
          {/* Yükleme overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* File input (gizli) */}
        <input 
          type="file" 
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
      
      {/* Yükleme durumu */}
      {uploading && (
        <div className="text-center mt-2">
          <div className="inline-block animate-spin h-6 w-6 border-2 border-white rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
