import { InputType, Field, ID, Float } from '@nestjs/graphql'
import {
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator'
import { Type } from 'class-transformer'

@InputType({ description: 'Input for creating a new order' })
export class OrderInput {
  @Field(() => [OrderItemInput], {
    description: 'List of items to order',
  })
  @IsArray({ message: 'Items must be an array' })
  @ArrayMinSize(1, { message: 'Order must contain at least one item' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items!: OrderItemInput[]
}

@InputType({ description: 'Input for order item' })
export class OrderItemInput {
  @Field(() => ID, {
    description: 'ID of the recipe ingredient to order',
  })
  @IsString({ message: 'Recipe ingredient ID is required' })
  @IsNotEmpty({ message: 'Recipe ingredient ID is required' })
  recipeIngredientId!: string

  @Field(() => Float, {
    defaultValue: 1,
    description: 'Quantity to order',
  })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsPositive({ message: 'Quantity must be positive' })
  quantity!: number
}
