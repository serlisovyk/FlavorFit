'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthInput } from '@generated/graphql'
import { Input, Button } from '@shared/ui'
import { AuthChangeTypeForm } from '../auth-change-form'
import { useAuthMutation } from '../../queries'
import { authSchema } from '../../schemas'
import { AuthFormProps } from '../../types'
import { AUTH_FORM_DEFAULT_VALUES } from '../../constants'

export function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === 'login'

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInput>({
    mode: 'onSubmit',
    defaultValues: AUTH_FORM_DEFAULT_VALUES,
    resolver: zodResolver(authSchema),
  })

  const { auth, isLoading } = useAuthMutation(isLogin)

  const handleAuth = (data: AuthInput) => auth({ variables: { data } })

  const formTitle = isLogin ? 'Login' : 'Register'

  return (
    <div className="flex h-screen">
      <div className="m-auto w-sm p-5 text-white rounded-lg shadow-lg bg-linear-to-tr from-primary to-primary-dark">
        <h1 className="text-center font-bold text-2xl md:text-4xl mb-5">
          {formTitle}
        </h1>

        <form className="space-y-3 mb-3" onSubmit={handleSubmit(handleAuth)}>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Enter email:"
            required
            {...register('email')}
            error={errors.email}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter password:"
            required
            {...register('password')}
            error={errors.password}
          />

          <div className="text-center">
            <Button
              variant="accent"
              type="submit"
              disabled={!isValid || isLoading}
            >
              {formTitle}
            </Button>
          </div>
        </form>

        <AuthChangeTypeForm isLogin={isLogin} />
      </div>
    </div>
  )
}
