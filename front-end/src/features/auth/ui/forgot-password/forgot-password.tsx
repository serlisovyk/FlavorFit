'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RequestPasswordResetInput } from '@generated/graphql'
import { Button, Field, FIELD_VARIANT } from '@shared/ui'
import { Captcha } from '../captcha'
import { useForgotPasswordMutation } from '../../queries'
import { forgotPasswordSchema } from '../../schemas'
import { FORGOT_PASSWORD_FORM_DEFAULT_VALUES } from '../../constants'

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RequestPasswordResetInput>({
    mode: 'onSubmit',
    defaultValues: FORGOT_PASSWORD_FORM_DEFAULT_VALUES,
    resolver: zodResolver(forgotPasswordSchema),
  })

  const { handleForgotPassword, isLoading } = useForgotPasswordMutation()

  const onSubmit = (data: RequestPasswordResetInput) =>
    handleForgotPassword(data)

  return (
    <div className="flex h-screen">
      <div className="relative m-auto w-sm p-10 text-white rounded-lg shadow-lg bg-linear-to-tr from-primary to-primary-dark">
        <h1 className="text-center font-bold text-2xl md:text-4xl mb-5">
          Forgot Password
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Field
            variant={FIELD_VARIANT.INPUT}
            id="email"
            type="email"
            label="Email"
            isShowLabel={false}
            placeholder="Enter email:"
            required
            {...register('email')}
            error={errors.email}
          />

          <Captcha />

          <div className="text-center">
            <Button
              type="submit"
              variant="secondary"
              disabled={!isValid || isLoading}
            >
              {isLoading ? 'Submitting...' : 'Request Password Reset'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
