'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client/react'
import {
  RequestPasswordResetDocument,
  RequestPasswordResetInput,
} from '@generated/graphql'
import { ROUTES, TURNSTILE_TOKEN_HEADER } from '@shared/config'
import { useCaptcha } from '../providers'

export function useForgotPasswordMutation() {
  const router = useRouter()

  const { captchaToken, validateToken } = useCaptcha()

  const [requestForgotPassword, { loading }] = useMutation(
    RequestPasswordResetDocument,
    {
      onCompleted: () => {
        toast.success('If email exists, a password reset link has been sent.')
        router.replace(ROUTES.LOGIN)
      },

      onError: () => {
        toast.error('Something went wrong. Please try again later.')
      },
    },
  )

  const handleForgotPassword = (data: RequestPasswordResetInput) => {
    if (!validateToken()) return

    requestForgotPassword({
      variables: { data },
      context: { headers: { [TURNSTILE_TOKEN_HEADER]: captchaToken } },
    })
  }

  return { handleForgotPassword, isLoading: loading }
}
