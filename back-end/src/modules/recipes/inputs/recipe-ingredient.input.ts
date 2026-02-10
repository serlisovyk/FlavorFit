import { InputType, Field, ID } from '@nestjs/graphql';
import { UNIT } from '@prisma/generated/prisma/enums';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
} from 'class-validator';
import {
  RECIPE_INGREDIENT_INPUT_DESCRIPTION,
  RECIPE_INGREDIENT_ID_FIELD_DESCRIPTION,
  RECIPE_INGREDIENT_QUANTITY_FIELD_DESCRIPTION,
  RECIPE_INGREDIENT_UNIT_FIELD_DESCRIPTION,
  RECIPE_INGREDIENT_ID_REQUIRED_ERROR,
  RECIPE_INGREDIENT_QUANTITY_POSITIVE_ERROR,
  RECIPE_INGREDIENT_QUANTITY_NUMBER_ERROR,
  RECIPE_INGREDIENT_UNIT_ENUM_ERROR,
} from '../recipes.constants';

@InputType({ description: RECIPE_INGREDIENT_INPUT_DESCRIPTION })
export class RecipeIngredientInput {
  @Field(() => ID, { description: RECIPE_INGREDIENT_ID_FIELD_DESCRIPTION })
  @IsString({ message: RECIPE_INGREDIENT_ID_REQUIRED_ERROR })
  @IsNotEmpty({ message: RECIPE_INGREDIENT_ID_REQUIRED_ERROR })
  ingredientId!: string;

  @Field(() => Number, {
    description: RECIPE_INGREDIENT_QUANTITY_FIELD_DESCRIPTION,
  })
  @IsNumber({}, { message: RECIPE_INGREDIENT_QUANTITY_NUMBER_ERROR })
  @IsPositive({ message: RECIPE_INGREDIENT_QUANTITY_POSITIVE_ERROR })
  quantity!: number;

  @Field(() => UNIT, { description: RECIPE_INGREDIENT_UNIT_FIELD_DESCRIPTION })
  @IsEnum(UNIT, { message: RECIPE_INGREDIENT_UNIT_ENUM_ERROR })
  unit!: UNIT;
}
