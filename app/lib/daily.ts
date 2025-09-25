/**
 * Daily.co API entegrasyonu
 * Video görüşme odaları oluşturma ve yönetme servisi
 */

interface DailyRoom {
  id: string;
  name: string;
  url: string;
  created_at: string;
  config: {
    max_participants: number;
    nbf?: number; // not before (başlangıç zamanı)
    exp?: number; // expiration (bitiş zamanı)
    enable_chat: boolean;
    enable_recording: 'cloud' | 'local' | false;
    enable_screenshare: boolean;
    enable_knocking: boolean;
    enable_prejoin_ui: boolean;
  };
}

interface CreateRoomOptions {
  name: string;
  maxParticipants?: number;
  duration?: number; // dakika cinsinden
  enableChat?: boolean;
  enableRecording?: boolean;
  enableScreenshare?: boolean;
  enableKnocking?: boolean;
  enablePrejoinUI?: boolean;
}

interface MeetingToken {
  token: string;
  room_name: string;
  user_id: string;
  is_owner: boolean;
  exp: number;
}

class DailyService {
  private apiKey: string;
  private baseUrl = 'https://api.daily.co/v1';

  constructor() {
    this.apiKey = process.env.DAILY_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('DAILY_API_KEY environment variable is required');
    }
  }

  /**
   * Yeni bir ephemeral (geçici) video görüşme odası oluşturur
   * Ephemeral odalar otomatik olarak belirtilen süre sonunda silinir
   */
  async createRoom(options: CreateRoomOptions): Promise<DailyRoom> {
    const {
      name,
      maxParticipants = 2,
      duration = 30, // 30 dakika (ephemeral room)
      enableChat = true,
      enableRecording = false,
      enableScreenshare = true,
      enableKnocking = false,
      enablePrejoinUI = true,
    } = options;

    const now = Math.floor(Date.now() / 1000);
    const exp = now + (duration * 60); // saniye cinsinden

    // Ephemeral room konfigürasyonu (yalnızca yaygın ve desteklenen alanlar)
    const roomConfig: Record<string, unknown> = {
      max_participants: maxParticipants,
      nbf: now, // not before - odanın aktif olma zamanı
      exp: exp, // expiration - odanın otomatik silinme zamanı
      enable_chat: enableChat,
      enable_screenshare: enableScreenshare,
      enable_knocking: enableKnocking,
      enable_prejoin_ui: enablePrejoinUI,
    };
    // Kayıt isteğe bağlı ve sadece 'cloud' destekleniyorsa ekle
    if (enableRecording) {
      (roomConfig as any).enable_recording = 'cloud';
    }

    try {
      const response = await fetch(`${this.baseUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          privacy: 'private',
          properties: roomConfig,
        }),
      });

      if (!response.ok) {
        let body: any = null;
        try { body = await response.json(); } catch {}
        const msg = body?.info || body?.error || body?.message || response.statusText;
        console.error('Daily rooms API error', { status: response.status, body });
        throw new Error(`Daily.co API error: ${msg}`);
      }

      const room = await response.json();
      return room;
    } catch (error) {
      console.error('Daily.co room creation failed:', error);
      throw new Error('Oda oluşturulamadı');
    }
  }

  /**
   * Mevcut odayı getirir
   */
  async getRoom(roomName: string): Promise<DailyRoom | null> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${roomName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        let body: any = null;
        try { body = await response.json(); } catch {}
        const msg = body?.info || body?.error || body?.message || response.statusText;
        console.error('Daily meeting-tokens API error', { status: response.status, body });
        throw new Error(`Daily.co API error: ${msg}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Daily.co room fetch failed:', error);
      throw new Error('Oda bilgileri alınamadı');
    }
  }

  /**
   * Odayı siler
   */
  async deleteRoom(roomName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${roomName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Daily.co room deletion failed:', error);
      return false;
    }
  }

  /**
   * Toplantı token'ı oluşturur (güvenli erişim için)
   * Ephemeral odalar için token süresi oda süresiyle aynı olmalı
   */
  async createMeetingToken(
    roomName: string,
    userId: string,
    isOwner: boolean = false,
    duration: number = 30 // 30 dakika (ephemeral room)
  ): Promise<MeetingToken> {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + (duration * 60);

    try {
      const response = await fetch(`${this.baseUrl}/meeting-tokens`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            room_name: roomName,
            user_id: userId,
            is_owner: isOwner,
            exp: exp,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Daily.co API error: ${error.error || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Daily.co meeting token creation failed:', error);
      throw new Error('Toplantı token\'ı oluşturulamadı');
    }
  }

  /**
   * Oda kayıtlarını getirir
   */
  async getRoomRecordings(roomName: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${roomName}/recordings`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Daily.co API error: ${error.error || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Daily.co recordings fetch failed:', error);
      return [];
    }
  }

  /**
   * Oda istatistiklerini getirir
   */
  async getRoomStats(roomName: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${roomName}/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Daily.co API error: ${error.error || 'Unknown error'}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Daily.co room stats fetch failed:', error);
      throw new Error('Oda istatistikleri alınamadı');
    }
  }
}

// Singleton instance
export const dailyService = new DailyService();

// Types export
export type { DailyRoom, CreateRoomOptions, MeetingToken };

