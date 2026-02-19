import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Profile } from '@prisma/generated/client'
import { GENDER } from '@prisma/generated/enums'
import { BaseModel } from '@/shared/models/base.model'

@ObjectType({ description: 'User profile model' })
export class ProfileModel extends BaseModel implements Profile {
  @Field(() => String, {
    nullable: false,
    description: 'User full name',
  })
  fullName!: string

  @Field(() => GENDER, {
    nullable: true,
    description: 'User gender',
  })
  gender!: `${GENDER}` | null

  @Field(() => Int, { nullable: true, description: 'User age' })
  age!: number | null

  @Field(() => String, { nullable: true, description: 'User biography' })
  bio!: string | null

  @Field(() => String, {
    nullable: false,
    description: 'ID of the user who owns the profile',
  })
  userId!: string
}
