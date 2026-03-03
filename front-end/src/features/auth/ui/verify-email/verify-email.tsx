'use client'

import { useVerifyEmailMutation } from '../../queries'

export function VerifyEmail() {
  useVerifyEmailMutation()

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Verifying your email...</p>
    </div>
  )
}
