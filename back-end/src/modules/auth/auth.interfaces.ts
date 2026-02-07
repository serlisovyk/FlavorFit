import { Field, ObjectType } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from '@prisma/generated/graphql/user';

export type AuthTokenData = Pick<User, 'id' | 'role'>;

export interface RequestWithUser extends Request {
  user?: CurrentUser;
}

export type CurrentUser = Omit<User, 'password'>;

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user!: User;

  @Field()
  accessToken!: string;
}
