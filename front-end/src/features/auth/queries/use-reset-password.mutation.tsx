'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client/react'
import { ResetPasswordDocument } from '@generated/graphql'
import { ROUTES, TURNSTILE_TOKEN_HEADER } from '@shared/config'
import { useCaptcha } from '../providers'
import { ResetPasswordFormData } from '../types'

export function useResetPasswordMutation() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const { captchaToken, validateToken } = useCaptcha()

  const [resetPassword, { loading }] = useMutation(ResetPasswordDocument, {
    onCompleted: () => {
      toast.success('Password successfully changed!')
      router.replace(ROUTES.LOGIN)
    },

    onError: () => {
      toast.error('Invalid or expired link.')
    },
  })

  const handleResetPassword = ({ newPassword }: ResetPasswordFormData) => {
    if (!validateToken() || !token) return

    resetPassword({
      variables: { data: { token, newPassword } },
      context: { headers: { [TURNSTILE_TOKEN_HEADER]: captchaToken } },
    })
  }

  return { handleResetPassword, isLoading: loading }
}
