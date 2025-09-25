import { z } from 'zod';

// Okul e-postası: @std.medipol.edu.tr ile bitmeli
export const SCHOOL_EMAIL_DOMAIN = 'std.medipol.edu.tr';
export const schoolEmailSchema = z
	.string()
	.trim()
	.toLowerCase()
	.email('Geçerli bir e-posta adresi girin')
	.refine((email) => email.endsWith('@std.medipol.edu.tr'), {
		message: 'Sadece Medipol Üniversitesi e-posta adresleri kabul edilir'
	});

// 4 haneli OTP
export const otpSchema = z
	.string()
	.trim()
	.regex(/^\d{4}$/u, '4 haneli kod giriniz');

export type SchoolEmail = z.infer<typeof schoolEmailSchema>;
export type OtpCode = z.infer<typeof otpSchema>;

// Profil güncelleme şeması (MVP)
export const profileUpdateSchema = z.object({
  name: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.string().trim().min(1, 'Ad gerekli').max(100).optional(),
  ),
  surname: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.string().trim().min(1, 'Soyad gerekli').max(100).optional(),
  ),
  department: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.string().trim().max(120).optional(),
  ),
  class_year: z
    .union([z.string(), z.number(), z.null()])
    .transform((v) => {
      if (v === null) return undefined;
      if (typeof v === 'string') return v === '' ? undefined : Number(v);
      return v;
    })
    .refine((v) => v === undefined || (Number.isInteger(v) && v >= 1 && v <= 8), 'Sınıf 1-8 arası olmalı')
    .optional(),
  avatar_url: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.string().url().max(300).optional(),
  ),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

export const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export const userLanguagesUpdateSchema = z.object({
  role: z.enum(['learn', 'teach']),
  items: z
    .array(
      z.object({
        code: z.string().length(2),
        level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
      }),
    )
    .max(20),
});

export type UserLanguagesUpdateInput = z.infer<typeof userLanguagesUpdateSchema>;

// Görüşme sistemi validation şemaları

// CEFR seviyeleri
export const cefrLevelSchema = z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

// Eşleştirme durumları
export const matchStatusSchema = z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED']);

// Görüşme durumları
export const sessionStatusSchema = z.enum(['SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELLED']);

// Eşleştirme oluşturma şeması
export const createMatchSchema = z.object({
  learner_id: z.string().cuid('Geçersiz kullanıcı ID'),
  teacher_id: z.string().cuid('Geçersiz kullanıcı ID'),
  language_id: z.string().cuid('Geçersiz dil ID'),
  learner_level: cefrLevelSchema,
  teacher_level: cefrLevelSchema,
});

export type CreateMatchInput = z.infer<typeof createMatchSchema>;

// Eşleştirme durumu güncelleme şeması
export const updateMatchStatusSchema = z.object({
  status: matchStatusSchema,
});

export type UpdateMatchStatusInput = z.infer<typeof updateMatchStatusSchema>;

// Görüşme oturumu oluşturma şeması
export const createSessionSchema = z.object({
  match_id: z.string().cuid('Geçersiz eşleştirme ID'),
  scheduled_at: z.string().datetime('Geçersiz tarih formatı').transform((str) => new Date(str)),
  room_password: z.string().min(4).max(20).optional(),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

// Görüşme durumu güncelleme şeması
export const updateSessionStatusSchema = z.object({
  status: sessionStatusSchema,
  started_at: z.string().datetime().optional().transform((str) => str ? new Date(str) : undefined),
  ended_at: z.string().datetime().optional().transform((str) => str ? new Date(str) : undefined),
  duration_minutes: z.number().int().min(1).max(120).optional(),
});

export type UpdateSessionStatusInput = z.infer<typeof updateSessionStatusSchema>;

// Puanlama şeması
export const createRatingSchema = z.object({
  session_id: z.string().cuid('Geçersiz oturum ID'),
  rated_id: z.string().cuid('Geçersiz kullanıcı ID'),
  rating: z.number().int().min(1).max(5, 'Puan 1-5 arası olmalı'),
  comment: z.string().max(500, 'Yorum 500 karakterden fazla olamaz').optional(),
});

export type CreateRatingInput = z.infer<typeof createRatingSchema>;

// Eşleştirme listesi filtreleme şeması
export const matchListFiltersSchema = z.object({
  status: matchStatusSchema.optional(),
  language_id: z.string().cuid().optional(),
  learner_level: cefrLevelSchema.optional(),
  teacher_level: cefrLevelSchema.optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20),
});

export type MatchListFiltersInput = z.infer<typeof matchListFiltersSchema>;

// Görüşme listesi filtreleme şeması
export const sessionListFiltersSchema = z.object({
  status: sessionStatusSchema.optional(),
  user_id: z.string().cuid().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20),
});

export type SessionListFiltersInput = z.infer<typeof sessionListFiltersSchema>;

// Jitsi oda oluşturma şeması
export const jitsiRoomConfigSchema = z.object({
  room_id: z.string().min(1).max(50, 'Oda ID 50 karakterden fazla olamaz'),
  password: z.string().min(4).max(20).optional(),
  max_duration: z.number().int().min(15).max(120).default(60), // 15-120 dakika
  features: z.object({
    chat: z.boolean().default(true),
    screen_share: z.boolean().default(true),
    recording: z.boolean().default(false), // MVP'de kayıt kapalı
  }).default({}),
});

export type JitsiRoomConfigInput = z.infer<typeof jitsiRoomConfigSchema>;

// Parola ile giriş şeması
export const loginWithPasswordSchema = z.object({
  email: schoolEmailSchema,
  password: z.string().min(6, 'Parola en az 6 karakter olmalı'),
  rememberMe: z.boolean().default(true)
});

export type LoginWithPasswordInput = z.infer<typeof loginWithPasswordSchema>;


