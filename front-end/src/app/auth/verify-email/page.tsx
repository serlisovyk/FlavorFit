import { Metadata } from 'next'
import { VerifyEmail } from '@features/auth'
import { NO_INDEX_PAGE_METADATA } from '@shared/constants'

export const metadata: Metadata = {
  title: 'Verify Email',
  ...NO_INDEX_PAGE_METADATA,
}

export default function VerifyEmailPage() {
  return <VerifyEmail />
}
