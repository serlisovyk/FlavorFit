'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Field, FIELD_VARIANT } from '@shared/ui'
import { Captcha } from '../captcha'
import { useResetPasswordMutation } from '../../queries'
import { resetPasswordSchema } from '../../schemas'
import { DEFAULT_RESET_PASSWORD_FORM_VALUES } from '../../constants'
import { ResetPasswordFormData } from '../../types'

export function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormData>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_RESET_PASSWORD_FORM_VALUES,
    resolver: zodResolver(resetPasswordSchema),
  })

  const { handleResetPassword, isLoading } = useResetPasswordMutation()

  const onSubmit = (data: ResetPasswordFormData) => handleResetPassword(data)

  return (
    <div className="flex h-screen">
      <div className="relative m-auto w-sm p-10 text-white rounded-lg shadow-lg bg-linear-to-tr from-primary to-primary-dark">
        <h1 className="text-center font-bold text-2xl md:text-4xl mb-5">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field
            variant={FIELD_VARIANT.INPUT}
            id="newPassword"
            type="password"
            label="New password"
            isShowLabel={false}
            placeholder="Enter new password:"
            required
            {...register('newPassword')}
            error={errors.newPassword}
          />

          <Captcha />

          <div className="text-center">
            <Button
              variant="secondary"
              type="submit"
              disabled={!isValid || isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
