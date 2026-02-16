import { useMutation } from '@apollo/client/react'
import toast from 'react-hot-toast'
import { LoginDocument, RegisterDocument } from '@generated/graphql'

export function useAuthMutation(isLogin: boolean) {
  const [auth, { loading }] = useMutation(
    isLogin ? LoginDocument : RegisterDocument,
    {
      onCompleted: () => {
        toast.success(
          isLogin ? 'Logged in successfully!' : 'Registered successfully!',
          { id: 'auth-success' },
        )
      },
      onError: (error) => {
        toast.error(error.message, { id: 'auth-error' })
      },
    },
  )

  return { auth, isLoading: loading }
}
