import { InputType, Field, Int } from '@nestjs/graphql'
import { ACTIVITY_LEVEL, NUTRITION_GOAL } from '@prisma/generated/enums'
import { IsEnum, IsOptional, Min } from 'class-validator'

@InputType({ description: 'Data for updating user physical measurements' })
export class MeasurementUpdateInput {
  @Field(() => Int, {
    nullable: true,
    description: 'Height in centimeters',
  })
  @IsOptional()
  @Min(1, { message: 'Height must be a positive number' })
  heightCm?: number

  @Field(() => Int, {
    nullable: true,
    description: 'Weight in kilograms',
  })
  @IsOptional()
  @Min(1, { message: 'Weight must be a positive number' })
  weightKg?: number

  @Field(() => Int, {
    nullable: true,
    description: 'Target weight in kilograms',
  })
  @IsOptional()
  @Min(1, { message: 'Target weight must be a positive number' })
  goalWeightKg?: number

  @Field(() => Int, {
    nullable: true,
    description: 'Chest circumference in centimeters',
  })
  @IsOptional()
  @Min(1, { message: 'Chest circumference must be a positive number' })
  chestCm?: number

  @Field(() => Int, {
    nullable: true,
    description: 'Waist circumference in centimeters',
  })
  @IsOptional()
  @Min(1, { message: 'Waist circumference must be a positive number' })
  waistCm?: number

  @Field(() => Int, {
    nullable: true,
    description: 'Thigh circumference in centimeters',
  })
  @IsOptional()
  @Min(1, { message: 'Thigh circumference must be a positive number' })
  thighCm?: number

  @Field(() => Int, {
    nullable: true,
    description: 'Arm circumference in centimeters',
  })
  @IsOptional()
  @Min(1, { message: 'Arm circumference must be a positive number' })
  armCm?: number

  @Field(() => ACTIVITY_LEVEL, {
    nullable: true,
    description: 'Physical activity level',
  })
  @IsOptional()
  @IsEnum(ACTIVITY_LEVEL, {
    message: 'Activity level must be one of the allowed values',
  })
  activityLevel?: `${ACTIVITY_LEVEL}`

  @Field(() => NUTRITION_GOAL, {
    nullable: true,
    description: 'Nutrition goal',
  })
  @IsOptional()
  @IsEnum(NUTRITION_GOAL, {
    message: 'Nutrition goal must be one of the allowed values',
  })
  nutritionGoal?: `${NUTRITION_GOAL}`
}
