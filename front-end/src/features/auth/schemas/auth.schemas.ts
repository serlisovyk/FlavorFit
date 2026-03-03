import z from 'zod'

export const emailSchema = z
  .string({ error: 'Email must be a string' })
  .min(1, { message: 'Email is required' })
  .pipe(z.email({ error: 'Invalid email address' }))

export const passwordSchema = z
  .string({ error: 'Password must be a string' })
  .min(1, { message: 'Password is required' })
  .min(6, { message: 'Password must be at least 6 characters' })

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
})
