import { Metadata } from 'next'
import { ForgotPassword } from '@features/auth'
import { NO_INDEX_PAGE_METADATA } from '@shared/constants'

export const metadata: Metadata = {
  title: 'Forgot Password',
  ...NO_INDEX_PAGE_METADATA,
}

export default function ForgotPasswordPage() {
  return <ForgotPassword />
}
