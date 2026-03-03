import { Metadata } from 'next'
import { ResetPassword } from '@features/auth'
import { NO_INDEX_PAGE_METADATA } from '@shared/constants'

export const metadata: Metadata = {
  title: 'Reset Password',
  ...NO_INDEX_PAGE_METADATA,
}

export default function ResetPasswordPage() {
  return <ResetPassword />
}
