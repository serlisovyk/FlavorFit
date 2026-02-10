import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import {
  RECIPE_STEP_INPUT_DESCRIPTION,
  RECIPE_STEP_ORDER_FIELD_DESCRIPTION,
  RECIPE_STEP_TITLE_FIELD_DESCRIPTION,
  RECIPE_STEP_DESCRIPTION_FIELD_DESCRIPTION,
  RECIPE_STEP_ORDER_POSITIVE_ERROR,
  RECIPE_STEP_ORDER_INT_ERROR,
  RECIPE_STEP_TITLE_REQUIRED_ERROR,
  RECIPE_STEP_TITLE_MIN_LENGTH_ERROR,
  RECIPE_STEP_DESCRIPTION_REQUIRED_ERROR,
  RECIPE_STEP_DESCRIPTION_MIN_LENGTH_ERROR,
} from '../recipes.constants';

@InputType({ description: RECIPE_STEP_INPUT_DESCRIPTION })
export class RecipeStepInput {
  @Field(() => Int, {
    nullable: false,
    description: RECIPE_STEP_ORDER_FIELD_DESCRIPTION,
  })
  @IsInt({ message: RECIPE_STEP_ORDER_INT_ERROR })
  @IsPositive({ message: RECIPE_STEP_ORDER_POSITIVE_ERROR })
  order!: number;

  @Field(() => String, {
    nullable: false,
    description: RECIPE_STEP_TITLE_FIELD_DESCRIPTION,
  })
  @IsString({ message: RECIPE_STEP_TITLE_REQUIRED_ERROR })
  @IsNotEmpty({ message: RECIPE_STEP_TITLE_REQUIRED_ERROR })
  @MinLength(3, { message: RECIPE_STEP_TITLE_MIN_LENGTH_ERROR })
  title!: string;

  @Field(() => String, {
    nullable: false,
    description: RECIPE_STEP_DESCRIPTION_FIELD_DESCRIPTION,
  })
  @IsString({ message: RECIPE_STEP_DESCRIPTION_REQUIRED_ERROR })
  @IsNotEmpty({ message: RECIPE_STEP_DESCRIPTION_REQUIRED_ERROR })
  @MinLength(10, { message: RECIPE_STEP_DESCRIPTION_MIN_LENGTH_ERROR })
  description!: string;
}
