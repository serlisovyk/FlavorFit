import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  ACTIVITY_LEVEL,
  NUTRITION_GOAL,
  type Measurement,
} from '@prisma/generated/client';
import { BaseModel } from '@/shared/models/base.model';
import {
  MEASUREMENT_ACTIVITY_LEVEL_DESCRIPTION,
  MEASUREMENT_ARM_DESCRIPTION,
  MEASUREMENT_CHEST_DESCRIPTION,
  MEASUREMENT_GOAL_WEIGHT_DESCRIPTION,
  MEASUREMENT_HEIGHT_DESCRIPTION,
  MEASUREMENT_MODEL_DESCRIPTION,
  MEASUREMENT_NUTRITION_GOAL_DESCRIPTION,
  MEASUREMENT_THIGH_DESCRIPTION,
  MEASUREMENT_USER_ID_DESCRIPTION,
  MEASUREMENT_WAIST_DESCRIPTION,
  MEASUREMENT_WEIGHT_DESCRIPTION,
} from '../users.constants';

@ObjectType({ description: MEASUREMENT_MODEL_DESCRIPTION })
export class MeasurementModel extends BaseModel implements Measurement {
  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_HEIGHT_DESCRIPTION,
  })
  heightCm!: number | null;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_WEIGHT_DESCRIPTION,
  })
  weightKg!: number | null;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_GOAL_WEIGHT_DESCRIPTION,
  })
  goalWeightKg!: number | null;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_CHEST_DESCRIPTION,
  })
  chestCm!: number | null;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_WAIST_DESCRIPTION,
  })
  waistCm!: number | null;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_THIGH_DESCRIPTION,
  })
  thighCm!: number | null;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_ARM_DESCRIPTION,
  })
  armCm!: number | null;

  @Field(() => ACTIVITY_LEVEL, {
    nullable: true,
    description: MEASUREMENT_ACTIVITY_LEVEL_DESCRIPTION,
  })
  activityLevel!: `${ACTIVITY_LEVEL}` | null;

  @Field(() => NUTRITION_GOAL, {
    nullable: true,
    description: MEASUREMENT_NUTRITION_GOAL_DESCRIPTION,
  })
  nutritionGoal!: `${NUTRITION_GOAL}` | null;

  @Field(() => String, {
    nullable: false,
    description: MEASUREMENT_USER_ID_DESCRIPTION,
  })
  userId!: string;
}
