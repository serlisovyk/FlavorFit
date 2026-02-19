import { ObjectType, Field, Int } from '@nestjs/graphql'
import { ROLE, type User } from '@prisma/generated/client'
import { RecipeModel } from '@/modules/recipes/models/recipe.model'
import { OrderModel } from '@/modules/orders/models/order.model'
import { BaseModel } from '@/shared/models/base.model'
import { ProfileModel } from './profile.model'
import { MeasurementModel } from './measurement.model'
import '../enums/users.enums'

@ObjectType({ description: 'System user model' })
export class UserModel extends BaseModel implements User {
  @Field(() => String, { nullable: false, description: 'User email address' })
  email!: string

  @Field(() => String, {
    nullable: false,
    description: 'User password (hashed)',
  })
  password!: string

  @Field(() => ROLE, {
    defaultValue: ROLE.USER,
    nullable: false,
    description: 'User role in the system',
  })
  role!: `${ROLE}`

  @Field(() => ProfileModel, {
    nullable: true,
    description: 'User profile',
  })
  profile?: ProfileModel | null

  @Field(() => MeasurementModel, {
    nullable: true,
    description: 'User physical measurements',
  })
  measurements?: MeasurementModel | null

  @Field(() => [RecipeModel], {
    nullable: true,
    description: 'Recipes created by the user',
  })
  recipes?: RecipeModel[]

  // @Field(() => [Comment], { nullable: true })
  // comments?: Comment[];

  @Field(() => [Int], { nullable: true, description: 'IDs of liked recipes' })
  likes?: number[]

  @Field(() => [OrderModel], {
    nullable: true,
    description: 'User orders',
  })
  orders?: OrderModel[]
}
