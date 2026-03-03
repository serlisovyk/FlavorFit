'use client'

import {
  createContext,
  useContext,
  useRef,
  useState,
  PropsWithChildren,
} from 'react'
import toast from 'react-hot-toast'
import { TurnstileInstance } from '@marsidev/react-turnstile'
import { CaptchaContextType } from '../types'

const CaptchaContext = createContext<CaptchaContextType | null>(null)

export function CaptchaProvider({ children }: PropsWithChildren) {
  const captchaRef = useRef<TurnstileInstance | null>(null)

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const validateToken = (): boolean => {
    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA challenge.')
      return false
    }

    return true
  }

  return (
    <CaptchaContext.Provider
      value={{ captchaRef, captchaToken, setCaptchaToken, validateToken }}
    >
      {children}
    </CaptchaContext.Provider>
  )
}

export function useCaptcha() {
  const context = useContext(CaptchaContext)

  if (!context) {
    throw new Error('useCaptcha must be used within CaptchaProvider')
  }

  return context
}
