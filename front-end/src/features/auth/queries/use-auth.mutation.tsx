'use client'

import { useRouter } from 'next/navigation'
import { useApolloClient, useMutation } from '@apollo/client/react'
import toast from 'react-hot-toast'
import { LoginDocument, MeDocument, RegisterDocument } from '@generated/graphql'
import { ROUTES } from '@shared/config'
import { AuthMutation, AuthMutationVariables } from '../types'

export function useAuthMutation(isLogin: boolean) {
  const router = useRouter()

  const client = useApolloClient()

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
        toast.error(error.message, { id: 'auth-error' })
      },
    },
  )

  return { auth, isLoading: loading }
}
