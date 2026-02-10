import { InputType, Field, Int } from '@nestjs/graphql';
import { ACTIVITY_LEVEL, NUTRITION_GOAL } from '@prisma/generated/prisma/enums';
import { IsEnum, IsOptional, Min } from 'class-validator';
import {
  MEASUREMENT_ARM_MIN_ERROR,
  MEASUREMENT_CHEST_MIN_ERROR,
  MEASUREMENT_GOAL_WEIGHT_MIN_ERROR,
  MEASUREMENT_HEIGHT_MIN_ERROR,
  MEASUREMENT_THIGH_MIN_ERROR,
  MEASUREMENT_UPDATE_ACTIVITY_LEVEL_DESCRIPTION,
  MEASUREMENT_UPDATE_ARM_DESCRIPTION,
  MEASUREMENT_UPDATE_CHEST_DESCRIPTION,
  MEASUREMENT_UPDATE_GOAL_WEIGHT_DESCRIPTION,
  MEASUREMENT_UPDATE_HEIGHT_DESCRIPTION,
  MEASUREMENT_UPDATE_INPUT_DESCRIPTION,
  MEASUREMENT_UPDATE_NUTRITION_GOAL_DESCRIPTION,
  MEASUREMENT_UPDATE_THIGH_DESCRIPTION,
  MEASUREMENT_UPDATE_WAIST_DESCRIPTION,
  MEASUREMENT_UPDATE_WEIGHT_DESCRIPTION,
  MEASUREMENT_WAIST_MIN_ERROR,
  MEASUREMENT_WEIGHT_MIN_ERROR,
  MEASUREMENT_ACTIVITY_LEVEL_ENUM_ERROR,
  MEASUREMENT_NUTRITION_GOAL_ENUM_ERROR,
} from '../users.constants';

@InputType({ description: MEASUREMENT_UPDATE_INPUT_DESCRIPTION })
export class MeasurementUpdateInput {
  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_UPDATE_HEIGHT_DESCRIPTION,
  })
  @IsOptional()
  @Min(1, { message: MEASUREMENT_HEIGHT_MIN_ERROR })
  heightCm?: number;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_UPDATE_WEIGHT_DESCRIPTION,
  })
  @IsOptional()
  @Min(1, { message: MEASUREMENT_WEIGHT_MIN_ERROR })
  weightKg?: number;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_UPDATE_GOAL_WEIGHT_DESCRIPTION,
  })
  @IsOptional()
  @Min(1, { message: MEASUREMENT_GOAL_WEIGHT_MIN_ERROR })
  goalWeightKg?: number;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_UPDATE_CHEST_DESCRIPTION,
  })
  @IsOptional()
  @Min(1, { message: MEASUREMENT_CHEST_MIN_ERROR })
  chestCm?: number;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_UPDATE_WAIST_DESCRIPTION,
  })
  @IsOptional()
  @Min(1, { message: MEASUREMENT_WAIST_MIN_ERROR })
  waistCm?: number;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_UPDATE_THIGH_DESCRIPTION,
  })
  @IsOptional()
  @Min(1, { message: MEASUREMENT_THIGH_MIN_ERROR })
  thighCm?: number;

  @Field(() => Int, {
    nullable: true,
    description: MEASUREMENT_UPDATE_ARM_DESCRIPTION,
  })
  @IsOptional()
  @Min(1, { message: MEASUREMENT_ARM_MIN_ERROR })
  armCm?: number;

  @Field(() => ACTIVITY_LEVEL, {
    nullable: true,
    description: MEASUREMENT_UPDATE_ACTIVITY_LEVEL_DESCRIPTION,
  })
  @IsOptional()
  @IsEnum(ACTIVITY_LEVEL, { message: MEASUREMENT_ACTIVITY_LEVEL_ENUM_ERROR })
  activityLevel?: `${ACTIVITY_LEVEL}`;

  @Field(() => NUTRITION_GOAL, {
    nullable: true,
    description: MEASUREMENT_UPDATE_NUTRITION_GOAL_DESCRIPTION,
  })
  @IsOptional()
  @IsEnum(NUTRITION_GOAL, { message: MEASUREMENT_NUTRITION_GOAL_ENUM_ERROR })
  nutritionGoal?: `${NUTRITION_GOAL}`;
}
