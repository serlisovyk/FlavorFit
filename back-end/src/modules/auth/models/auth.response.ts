import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from '@/modules/users/models/user.model';
import {
  AUTH_RESPONSE_ACCESS_TOKEN_DESCRIPTION,
  AUTH_RESPONSE_DESCRIPTION,
  AUTH_RESPONSE_USER_DESCRIPTION,
} from '../auth.constants';

@ObjectType({ description: AUTH_RESPONSE_DESCRIPTION })
export class AuthResponse {
  @Field(() => UserModel, { description: AUTH_RESPONSE_USER_DESCRIPTION })
  user!: UserModel;

  @Field(() => String, { description: AUTH_RESPONSE_ACCESS_TOKEN_DESCRIPTION })
  accessToken!: string;
}
