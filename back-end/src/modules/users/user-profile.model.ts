import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';
import {
  ACTIVITY_LEVEL,
  GENDER,
  NUTRITION_GOAL,
  ROLE,
} from '../../../prisma/generated/prisma/enums';

registerEnumType(ROLE, { name: 'ROLE' });
registerEnumType(GENDER, { name: 'GENDER' });
registerEnumType(ACTIVITY_LEVEL, { name: 'ACTIVITY_LEVEL' });
registerEnumType(NUTRITION_GOAL, { name: 'NUTRITION_GOAL' });

@ObjectType()
export class BodyMeasurementModel {
  @Field()
  id: string;

  @Field(() => Int, { nullable: true })
  heightCM?: number;

  @Field(() => Int, { nullable: true })
  weightKg?: number;

  @Field(() => Int, { nullable: true })
  goalWeightKg?: number;

  @Field(() => Int, { nullable: true })
  chestCm?: number;

  @Field(() => Int, { nullable: true })
  waistCm?: number;

  @Field(() => Int, { nullable: true })
  thighCm?: number;

  @Field(() => Int, { nullable: true })
  armCm?: number;

  @Field(() => ACTIVITY_LEVEL, { nullable: true })
  activityLevel?: ACTIVITY_LEVEL;

  @Field(() => NUTRITION_GOAL, { nullable: true })
  nutritionGoal?: NUTRITION_GOAL;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class ProfileModel {
  @Field()
  id: string;

  @Field()
  fullName: string;

  @Field(() => GENDER, { nullable: true })
  gender?: GENDER;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class UserProfileModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => ROLE)
  role: ROLE;

  @Field(() => ProfileModel, { nullable: true })
  profile?: ProfileModel;

  @Field(() => BodyMeasurementModel, { nullable: true })
  measurements?: BodyMeasurementModel;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
