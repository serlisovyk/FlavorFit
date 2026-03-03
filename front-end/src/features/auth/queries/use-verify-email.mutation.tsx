'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client/react'
import { VerifyEmailDocument } from '@generated/graphql'
import { ROUTES } from '@shared/config'

export function useVerifyEmailMutation() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const [verifyEmail] = useMutation(VerifyEmailDocument, {
    onCompleted: () => {
      toast.success('Email verified successfully!')
      router.replace(ROUTES.LOGIN)
    },

    onError: () => {
      toast.error('Invalid or expired verification link.')
    },
  })

  useEffect(() => {
    if (token) verifyEmail({ variables: { token } })
  }, [token, verifyEmail])

  return {}
}
