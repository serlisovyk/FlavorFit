'use client'

import { Turnstile } from '@marsidev/react-turnstile'
import { NEXT_PUBLIC_TURNSTILE_SITE_KEY_ENV } from '@shared/env'
import { useCaptcha } from '../../providers'

export function Captcha() {
  const { captchaRef, setCaptchaToken } = useCaptcha()

  return (
    <div className="flex justify-center my-2">
      <Turnstile
        ref={captchaRef}
        siteKey={NEXT_PUBLIC_TURNSTILE_SITE_KEY_ENV!}
        onSuccess={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken(null)}
        options={{ theme: 'light' }}
      />
    </div>
  )
}
