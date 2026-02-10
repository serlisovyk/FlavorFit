import { Request } from 'express';
import { UserModel } from '../users/models/user.model';

export type AuthTokenData = Pick<UserModel, 'id' | 'role'>;

export type CurrentUser = Omit<UserModel, 'password'>;

export interface RequestWithUser extends Request {
  user?: CurrentUser;
}
