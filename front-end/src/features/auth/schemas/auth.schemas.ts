import z from 'zod'

export const authSchema = z.object({
  email: z
    .string({ error: 'Email must be a string' })
    .min(1, { message: 'Email is required' })
    .pipe(z.email({ error: 'Invalid email address' })),
  password: z
    .string({ error: 'Password must be a string' })
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
})
