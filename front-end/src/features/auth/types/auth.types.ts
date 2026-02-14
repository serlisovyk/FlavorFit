export interface AuthFormProps {
  type: AuthFormTypes
}

export type AuthFormTypes = 'login' | 'register'

export interface AuthLinksProps {
  isLogin: boolean
}
