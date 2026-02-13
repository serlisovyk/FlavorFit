'use client'

import { useMutation } from '@apollo/client/react'
import { LoginDocument, RegisterDocument } from '@generated/graphql'
import { Button, Input } from '@shared/ui'
import { AuthLinks } from '../auth-links'
import { AuthFormProps } from '../../types'

export function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === 'login'

  const [auth, { loading }] = useMutation(
    isLogin ? LoginDocument : RegisterDocument,
  )

  return (
    <div className="flex h-screen">
      <div className="m-auto w-sm p-5 text-white rounded-lg shadow-lg bg-linear-to-tr from-[#8062ee] to-[#a088fc]">
        <h1 className="text-center font-bold text-2xl md:text-4xl mb-5">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        <form className="space-y-3 mb-3">
          <Input type="email" name="email" placeholder="Email" required />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <div className="text-center">
            <Button type="submit" disabled={loading}>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </div>
        </form>

        <AuthLinks isLogin={isLogin} />
      </div>
    </div>
  )
}
