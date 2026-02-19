import { InputType, Field, Float, Int } from '@nestjs/graphql'
import { IsNumber, IsPositive, IsInt } from 'class-validator'

@InputType({ description: 'Nutrition facts input' })
export class NutritionFactInput {
  @Field(() => Float, {
    nullable: false,
    description: 'Protein content in grams',
  })
  @IsNumber({}, { message: 'Proteins must be a number' })
  @IsPositive({ message: 'Proteins must be positive' })
  proteins!: number

  @Field(() => Float, {
    nullable: false,
    description: 'Fat content in grams',
  })
  @IsNumber({}, { message: 'Fats must be a number' })
  @IsPositive({ message: 'Fats must be positive' })
  fats!: number

  @Field(() => Float, {
    nullable: false,
    description: 'Carbohydrate content in grams',
  })
  @IsNumber({}, { message: 'Carbohydrates must be a number' })
  @IsPositive({ message: 'Carbohydrates must be positive' })
  carbohydrates!: number

  @Field(() => Float, {
    nullable: false,
    description: 'Fiber content in grams',
  })
  @IsNumber({}, { message: 'Fiber must be a number' })
  @IsPositive({ message: 'Fiber must be positive' })
  fiber!: number

  @Field(() => Int, {
    nullable: false,
    description: 'Calorie content',
  })
  @IsInt({ message: 'Calories must be a number' })
  @IsPositive({ message: 'Calories must be positive' })
  calories!: number
}
