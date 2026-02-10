import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ROLE, type User } from '@prisma/generated/prisma/client';
import { RecipeModel } from '@/modules/recipes/models/recipe.model';
import { OrderModel } from '@/modules/orders/models/order.model';
import { BaseModel } from '@/shared/models/base.model';
import { ProfileModel } from './profile.model';
import { MeasurementModel } from './measurement.model';
import {
  USER_EMAIL_DESCRIPTION,
  USER_LIKES_DESCRIPTION,
  USER_MEASUREMENTS_DESCRIPTION,
  USER_MODEL_DESCRIPTION,
  USER_ORDERS_DESCRIPTION,
  USER_PASSWORD_DESCRIPTION,
  USER_PROFILE_DESCRIPTION,
  USER_RECIPES_DESCRIPTION,
  USER_ROLE_DESCRIPTION,
} from '../users.constants';
import '../enums/users.enums';

@ObjectType({ description: USER_MODEL_DESCRIPTION })
export class UserModel extends BaseModel implements User {
  @Field(() => String, { nullable: false, description: USER_EMAIL_DESCRIPTION })
  email!: string;

  @Field(() => String, {
    nullable: false,
    description: USER_PASSWORD_DESCRIPTION,
  })
  password!: string;

  @Field(() => ROLE, {
    defaultValue: ROLE.USER,
    nullable: false,
    description: USER_ROLE_DESCRIPTION,
  })
  role!: `${ROLE}`;

  @Field(() => ProfileModel, {
    nullable: true,
    description: USER_PROFILE_DESCRIPTION,
  })
  profile?: ProfileModel | null;

  @Field(() => MeasurementModel, {
    nullable: true,
    description: USER_MEASUREMENTS_DESCRIPTION,
  })
  measurements?: MeasurementModel | null;

  @Field(() => [RecipeModel], {
    nullable: true,
    description: USER_RECIPES_DESCRIPTION,
  })
  recipes?: RecipeModel[];

  // @Field(() => [Comment], { nullable: true })
  // comments?: Comment[];

  @Field(() => [Int], { nullable: true, description: USER_LIKES_DESCRIPTION })
  likes?: number[];

  @Field(() => [OrderModel], {
    nullable: true,
    description: USER_ORDERS_DESCRIPTION,
  })
  orders?: OrderModel[];
}
