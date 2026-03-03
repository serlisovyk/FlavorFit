import { RefObject } from 'react'
import { TurnstileInstance } from '@marsidev/react-turnstile'
import {
  LoginMutation,
  RegisterMutation,
  LoginMutationVariables,
  RegisterMutationVariables,
  ResetPasswordInput,
} from '@generated/graphql'

export interface AuthFormProps {
  type: AuthFormTypes
}

export type AuthFormTypes = 'login' | 'register'

export interface AuthLinksProps {
  isLogin: boolean
}

export type AuthMutation = LoginMutation | RegisterMutation

export type AuthMutationVariables =
  | LoginMutationVariables
  | RegisterMutationVariables

export type ResetPasswordFormData = Omit<ResetPasswordInput, 'token'>

export interface CaptchaContextType {
  captchaRef: RefObject<TurnstileInstance | null>
  captchaToken: string | null
  setCaptchaToken: (token: string | null) => void
  validateToken: () => boolean
}
