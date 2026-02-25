'use client'

import { useRouter } from 'next/navigation'
import { useApolloClient, useMutation } from '@apollo/client/react'
import toast from 'react-hot-toast'
import { LogoutDocument } from '@generated/graphql'
import { ROUTES } from '@shared/config'

export function useLogoutMutation() {
  const router = useRouter()

  const client = useApolloClient()

  const [logout, { loading }] = useMutation(LogoutDocument)

  const handleLogout = async () => {
    await logout()
    await client.clearStore()
    router.replace(ROUTES.LOGIN)
    toast.success('You have been logged out successfully')
  }

  return {
    handleLogout,
    isLoading: loading,
  }
}
