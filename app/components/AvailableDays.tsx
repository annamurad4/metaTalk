"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from './ui';
import { Calendar, Save } from 'lucide-react';

// Geçici Checkbox komponenti
const Checkbox = ({ checked, onCheckedChange, id }: { checked: boolean, onCheckedChange: (checked: boolean) => void, id: string }) => {
  return (
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={(e) => onCheckedChange(e.target.checked)}
      id={id}
      className="h-4 w-4 border border-gray-300 rounded"
    />
  );
};

// Gün türü tanımı
type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1 = Pazartesi, 7 = Pazar

// Hafta günleri
const DAYS_OF_WEEK = [
  { value: 1, label: 'Pazartesi' },
  { value: 2, label: 'Salı' },
  { value: 3, label: 'Çarşamba' },
  { value: 4, label: 'Perşembe' },
  { value: 5, label: 'Cuma' },
  { value: 6, label: 'Cumartesi' },
  { value: 7, label: 'Pazar' },
];

export default function AvailableDays() {
  const [availableDays, setAvailableDays] = useState<DayOfWeek[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Müsait günleri getir
  useEffect(() => {
    const fetchAvailableDays = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user-availability');
        if (response.ok) {
          const data = await response.json();
          if (data?.data) {
            setAvailableDays(data.data.map((item: any) => item.day as DayOfWeek));
          }
        }
      } catch (error) {
        console.error('Müsait günler yüklenirken hata oluştu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableDays();
  }, []);

  // Gün değişikliği
  const handleDayToggle = (day: DayOfWeek) => {
    setAvailableDays(prev => {
      const isSelected = prev.includes(day);
      if (isSelected) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  // Günleri kaydet
  const handleSaveAvailability = async () => {
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      console.log('[client][user-availability][PUT] sending', availableDays);
      const response = await fetch('/api/user-availability', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ days: availableDays }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[client][user-availability][PUT] saved', data?.data?.map((x:any)=>x.day));
        setMessage({ type: 'success', text: 'Müsait günleriniz kaydedildi!' });
      } else {
        setMessage({ type: 'error', text: 'Müsait günler kaydedilirken bir hata oluştu.' });
      }
    } catch (error) {
      console.error('Müsait günler kaydedilirken hata:', error);
      setMessage({ type: 'error', text: 'İşlem sırasında bir hata oluştu.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Müsait Olduğunuz Günler</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Görüşme yapmaya müsait olduğunuz günleri seçin. 
              Bu bilgi, sizin için uygun eşleşmelerin bulunmasında önemli olacaktır.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {DAYS_OF_WEEK.map((day) => (
                <label 
                  key={day.value} 
                  className={`
                    flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors
                    ${availableDays.includes(day.value as DayOfWeek) 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  <Checkbox 
                    checked={availableDays.includes(day.value as DayOfWeek)}
                    onCheckedChange={() => handleDayToggle(day.value as DayOfWeek)}
                    id={`day-${day.value}`}
                  />
                  <span>{day.label}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleSaveAvailability} 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Müsait Günleri Kaydet
                  </>
                )}
              </Button>
              
              {message && (
                <span 
                  className={`text-sm ${
                    message.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message.text}
                </span>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
