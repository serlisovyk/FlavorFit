import z from 'zod'

export const clientEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .optional()
    .default('development'),
  NEXT_PUBLIC_SERVER_URL_ENV: z
    .string({ error: 'SERVER_URL is required' })
    .url('Invalid SERVER_URL format'),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY_ENV: z
    .string({ error: 'TURNSTILE_SITE_KEY is required' })
    .min(1, 'TURNSTILE_SITE_KEY is required'),
})

export const serverEnvSchema = z.object({
  JWT_SECRET_ENV: z
    .string({ error: 'JWT_SECRET is required' })
    .min(5, 'JWT_SECRET must be at least 5 characters'),
})
