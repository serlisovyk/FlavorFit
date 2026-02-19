import { InputType, Field, ID } from '@nestjs/graphql'
import { UNIT } from '@prisma/generated/enums'
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
} from 'class-validator'

@InputType({ description: 'Recipe ingredient input' })
export class RecipeIngredientInput {
  @Field(() => ID, { description: 'Ingredient ID' })
  @IsString({ message: 'Ingredient ID is required' })
  @IsNotEmpty({ message: 'Ingredient ID is required' })
  ingredientId!: string

  @Field(() => Number, {
    description: 'Quantity of ingredient',
  })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsPositive({ message: 'Quantity must be positive' })
  quantity!: number

  @Field(() => UNIT, { description: 'Unit of measurement' })
  @IsEnum(UNIT, { message: 'Unit must be a valid unit type' })
  unit!: UNIT
}
