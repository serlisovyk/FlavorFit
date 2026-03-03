'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useApolloClient, useMutation } from '@apollo/client/react'
import {
  AuthInput,
  LoginDocument,
  MeDocument,
  RegisterDocument,
} from '@generated/graphql'
import { ROUTES, TURNSTILE_TOKEN_HEADER } from '@shared/config'
import { useCaptcha } from '../providers'
import { AuthMutation, AuthMutationVariables } from '../types'

export function useAuthMutation(isLogin: boolean) {
  const router = useRouter()

  const client = useApolloClient()

  const { captchaRef, captchaToken, setCaptchaToken, validateToken } =
    useCaptcha()

  const [auth, { loading }] = useMutation<AuthMutation, AuthMutationVariables>(
    isLogin ? LoginDocument : RegisterDocument,
    {
      onCompleted: (data) => {
        const authData = 'login' in data ? data.login : data.register

        client.writeQuery({
          query: MeDocument,
          data: {
            me: authData.user,
          },
        })

        toast.success(
          isLogin ? 'Logged in successfully!' : 'Registered successfully!',
          { id: 'auth-success' },
        )

        router.replace(ROUTES.DASHBOARD)
      },

      onError: (error) => {
        toast.error(error.message)

        captchaRef.current?.reset()
        setCaptchaToken(null)
      },
    },
  )

  const handleAuth = (data: AuthInput) => {
    if (!validateToken()) return

    auth({
      variables: { data },
      context: { headers: { [TURNSTILE_TOKEN_HEADER]: captchaToken } },
    })
  }

  return { handleAuth, isLoading: loading }
}
