import { Response } from 'express'
import { UserModel } from '../users/models/user.model'

export type AuthTokenData = Pick<UserModel, 'id' | 'role'>

export interface TurnstileResponse {
  success: boolean
}
