import { z } from 'zod';

// Уровни угрозы духов
export const ThreatLevel = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export type ThreatLevel = typeof ThreatLevel[keyof typeof ThreatLevel];

// Статус духа
export const SpiritStatus = {
  ACTIVE: 'active',
  CAPTURED: 'captured',
  ESCAPED: 'escaped',
} as const;

export type SpiritStatus = typeof SpiritStatus[keyof typeof SpiritStatus];

// Zod схема для духа
export const spiritSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  threatLevel: z.enum(['low', 'medium', 'high', 'critical']),
  energyLevel: z.number().min(0).max(100),
  status: z.enum(['active', 'captured', 'escaped']),
  detectedAt: z.string(),
  description: z.string(),
});

export type Spirit = z.infer<typeof spiritSchema>;

// Zod схема для списка духов
export const spiritsListSchema = z.array(spiritSchema);

// Zod схема для SSE события
export const sseEventSchema = z.object({
  type: z.enum(['update', 'new', 'remove']),
  spirit: spiritSchema,
});

export type SSEEvent = z.infer<typeof sseEventSchema>;

// Zod схема для ответа capture
export const captureResponseSchema = z.object({
  success: z.boolean(),
  spirit: spiritSchema.optional(),
  error: z.string().optional(),
});

export type CaptureResponse = z.infer<typeof captureResponseSchema>;
