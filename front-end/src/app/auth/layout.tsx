import { PropsWithChildren } from 'react'
import { CaptchaProvider } from '@features/auth'

export default function AuthLayout({ children }: PropsWithChildren) {
  return <CaptchaProvider>{children}</CaptchaProvider>
}
