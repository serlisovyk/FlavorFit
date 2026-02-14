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
import {
  ORDER_EMPTY_ERROR,
  ORDER_ITEMS_MUST_BE_ARRAY_ERROR,
  ORDER_QUANTITY_MUST_BE_NUMBER_ERROR,
  ORDER_QUANTITY_MUST_BE_POSITIVE_ERROR,
  RECIPE_INGREDIENT_ID_INVALID_ERROR,
  ORDER_INPUT_DESCRIPTION,
  ORDER_ITEM_INPUT_DESCRIPTION,
  ORDER_INPUT_ITEMS_FIELD_DESCRIPTION,
  ORDER_ITEM_INPUT_RECIPE_INGREDIENT_ID_FIELD_DESCRIPTION,
  ORDER_ITEM_INPUT_QUANTITY_FIELD_DESCRIPTION,
} from '../orders.constants'

@InputType({ description: ORDER_INPUT_DESCRIPTION })
export class OrderInput {
  @Field(() => [OrderItemInput], {
    description: ORDER_INPUT_ITEMS_FIELD_DESCRIPTION,
  })
  @IsArray({ message: ORDER_ITEMS_MUST_BE_ARRAY_ERROR })
  @ArrayMinSize(1, { message: ORDER_EMPTY_ERROR })
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items!: OrderItemInput[]
}

@InputType({ description: ORDER_ITEM_INPUT_DESCRIPTION })
export class OrderItemInput {
  @Field(() => ID, {
    description: ORDER_ITEM_INPUT_RECIPE_INGREDIENT_ID_FIELD_DESCRIPTION,
  })
  @IsString({ message: RECIPE_INGREDIENT_ID_INVALID_ERROR })
  @IsNotEmpty({ message: RECIPE_INGREDIENT_ID_INVALID_ERROR })
  recipeIngredientId!: string

  @Field(() => Float, {
    defaultValue: 1,
    description: ORDER_ITEM_INPUT_QUANTITY_FIELD_DESCRIPTION,
  })
  @IsNumber({}, { message: ORDER_QUANTITY_MUST_BE_NUMBER_ERROR })
  @IsPositive({ message: ORDER_QUANTITY_MUST_BE_POSITIVE_ERROR })
  quantity!: number
}
