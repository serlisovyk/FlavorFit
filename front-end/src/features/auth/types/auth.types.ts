import {
  LoginMutation,
  RegisterMutation,
  LoginMutationVariables,
  RegisterMutationVariables,
} from '@generated/graphql'

export interface AuthFormProps {
  type: AuthFormTypes
}

export type AuthFormTypes = 'login' | 'register'

export interface AuthChangeTypeFormProps {
  isLogin: boolean
}

export type AuthMutation = LoginMutation | RegisterMutation

export type AuthMutationVariables =
  | LoginMutationVariables
  | RegisterMutationVariables
