import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Request } from 'express';
import { ROLE } from '../../../prisma/generated/prisma/enums';

export interface AuthTokenData {
  id: string;
  role: ROLE;
}

export interface RequestWithUser extends Request {
  user?: CurrentUser;
}

export type CurrentUser = Omit<UserModel, 'password'>;

// TODO: Define proper user type
// (Codegen maybe generate Models for GraphQL from prisma)

registerEnumType(ROLE, { name: 'ROLE' });

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => ROLE)
  role: ROLE;
}

@ObjectType()
export class AuthResponse {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  accessToken: string;
}
