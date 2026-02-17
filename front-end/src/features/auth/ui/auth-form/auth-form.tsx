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
import Image from 'next/image'

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

  const formTitle = isLogin ? 'Sign In' : 'Sign Up'

  return (
    <div className="flex h-screen">
      <div className="relative m-auto w-sm p-10 text-white rounded-lg shadow-lg bg-linear-to-tr from-primary to-primary-dark">
        <h1 className="text-center font-bold text-2xl md:text-4xl mb-5">
          {formTitle}
        </h1>

        <form className="space-y-3 mb-4" onSubmit={handleSubmit(handleAuth)}>
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

        <Image
          src="/images/salad.png"
          alt="Salad"
          width={200}
          height={200}
          className="absolute -left-16 -bottom-16 -rotate-12"
          draggable={false}
        />
      </div>
    </div>
  )
}
