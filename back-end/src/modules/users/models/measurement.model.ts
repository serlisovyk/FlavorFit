import { ObjectType, Field, Int } from '@nestjs/graphql'
import {
  ACTIVITY_LEVEL,
  NUTRITION_GOAL,
  type Measurement,
} from '@prisma/generated/client'
import { BaseModel } from '@/shared/models/base.model'

@ObjectType({ description: 'User physical measurements model' })
export class MeasurementModel extends BaseModel implements Measurement {
  @Field(() => Int, {
    nullable: true,
    description: 'User height in centimeters',
  })
  heightCm!: number | null

  @Field(() => Int, {
    nullable: true,
    description: 'User weight in kilograms',
  })
  weightKg!: number | null

  @Field(() => Int, {
    nullable: true,
    description: 'User target weight in kilograms',
  })
  goalWeightKg!: number | null

  @Field(() => Int, {
    nullable: true,
    description: 'Chest circumference in centimeters',
  })
  chestCm!: number | null

  @Field(() => Int, {
    nullable: true,
    description: 'Waist circumference in centimeters',
  })
  waistCm!: number | null

  @Field(() => Int, {
    nullable: true,
    description: 'Thigh circumference in centimeters',
  })
  thighCm!: number | null

  @Field(() => Int, {
    nullable: true,
    description: 'Arm circumference in centimeters',
  })
  armCm!: number | null

  @Field(() => ACTIVITY_LEVEL, {
    nullable: true,
    description: 'Physical activity level',
  })
  activityLevel!: `${ACTIVITY_LEVEL}` | null

  @Field(() => NUTRITION_GOAL, {
    nullable: true,
    description: 'Nutrition goal',
  })
  nutritionGoal!: `${NUTRITION_GOAL}` | null

  @Field(() => String, {
    nullable: false,
    description: 'ID of the user who owns the measurements',
  })
  userId!: string
}
