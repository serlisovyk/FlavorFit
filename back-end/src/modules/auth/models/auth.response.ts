import { ObjectType, Field } from '@nestjs/graphql'
import { UserModel } from '@/modules/users/models/user.model'

@ObjectType({ description: 'Authentication response' })
export class AuthResponse {
  @Field(() => UserModel, { description: 'Authenticated user' })
  user!: UserModel

  @Field(() => String, { description: 'JWT access token for authentication' })
  accessToken!: string
}
