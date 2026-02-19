import { InputType, Field, Int } from '@nestjs/graphql'
import {
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator'

@InputType({ description: 'Recipe step input' })
export class RecipeStepInput {
  @Field(() => Int, {
    nullable: false,
    description: 'Step order number',
  })
  @IsInt({ message: 'Order must be an integer' })
  @IsPositive({ message: 'Order must be positive' })
  order!: number

  @Field(() => String, {
    nullable: false,
    description: 'Step title',
  })
  @IsString({ message: 'Step title is required' })
  @IsNotEmpty({ message: 'Step title is required' })
  @MinLength(3, { message: 'Step title must be at least 3 characters' })
  title!: string

  @Field(() => String, {
    nullable: false,
    description: 'Step description',
  })
  @IsString({ message: 'Step description is required' })
  @IsNotEmpty({ message: 'Step description is required' })
  @MinLength(10, { message: 'Step description must be at least 10 characters' })
  description!: string
}
