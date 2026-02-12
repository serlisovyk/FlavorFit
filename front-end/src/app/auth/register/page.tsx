import type { Metadata } from 'next'
import { AuthForm } from '@features/auth'
import { NO_INDEX_PAGE_METADATA } from '@shared/constants'

export const metadata: Metadata = {
  title: 'Register',
  ...NO_INDEX_PAGE_METADATA,
}

export default function RegisterPage() {
  return (
    <div>
      <AuthForm type="register" />
    </div>
  )
}
