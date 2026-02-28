import { Request, Response } from 'express'
import { UserModel } from '@prisma/generated/models'

export interface GraphQLContext {
  req: PreparedRequest
  res: Response
}

export interface PreparedRequest extends Request {
  cookies: Record<string, string | undefined>
  user?: CurrentUser
}

export type CurrentUser = Omit<UserModel, 'password'>
