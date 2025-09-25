'use client';

import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: Date) => void;
  existingDate?: Date;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  onSchedule,
  existingDate,
}: ScheduleModalProps) {
  // Varsayılan olarak mevcut tarih veya şimdiden 1 gün sonrası
  const defaultDate = existingDate || new Date(Date.now() + 24 * 60 * 60 * 1000);
  
  // Tarih ve saat için state
  const [date, setDate] = useState<string>(
    defaultDate.toISOString().split('T')[0]
  );
  const [time, setTime] = useState<string>(
    `${String(defaultDate.getHours()).padStart(2, '0')}:${String(
      defaultDate.getMinutes()
    ).padStart(2, '0')}`
  );
  
  // Görüşme planla
  const handleSchedule = () => {
    const scheduledDate = new Date(`${date}T${time}:00`);
    onSchedule(scheduledDate);
  };
  
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Görüşme Zamanı Planla</ModalTitle>
        </ModalHeader>
        
        <div className="p-6 space-y-6">
          {/* Tarih seçici */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 mr-2" />
              Tarih
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Bugünden önceki tarihleri devre dışı bırak
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* Saat seçici */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4 mr-2" />
              Saat
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* Bilgi notu */}
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
            <p>
              Görüşme zamanı belirlediğinizde, karşı tarafa bildirim gönderilecek ve 
              belirlenen zamanda görüntülü görüşme yapabileceksiniz.
            </p>
          </div>
        </div>
        
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button onClick={handleSchedule}>
            Görüşme Planla
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
