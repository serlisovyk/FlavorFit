import { Request, Response } from 'express'
import { UserModel } from '../users/models/user.model'

export type AuthTokenData = Pick<UserModel, 'id' | 'role'>

export type CurrentUser = Omit<UserModel, 'password'>

export interface RequestWithUser extends Request {
  user?: CurrentUser
}

export type TokenName = 'accessToken' | 'refreshToken'

export interface ToggleAuthTokenCookieParams {
  response: Response
  token: string | null
  name: TokenName
  expires: Date
}
