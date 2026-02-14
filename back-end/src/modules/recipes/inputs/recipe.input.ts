import { InputType, Field, Int } from '@nestjs/graphql'
import { DIFFICULTY } from '@prisma/generated/enums'
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsInt,
  IsPositive,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { NutritionFactInput } from './nutrition-fact.input'
import { RecipeStepInput } from './recipe-step.input'
import { RecipeIngredientInput } from './recipe-ingredient.input'
import {
  RECIPE_INPUT_DESCRIPTION,
  RECIPE_SLUG_FIELD_DESCRIPTION,
  RECIPE_TITLE_FIELD_DESCRIPTION,
  RECIPE_DESCRIPTION_FIELD_DESCRIPTION,
  RECIPE_COOKING_TIME_FIELD_DESCRIPTION,
  RECIPE_DIFFICULTY_FIELD_DESCRIPTION,
  RECIPE_NUTRITION_FACT_FIELD_DESCRIPTION,
  RECIPE_TAGS_FIELD_DESCRIPTION,
  RECIPE_STEPS_FIELD_DESCRIPTION,
  RECIPE_INGREDIENTS_FIELD_DESCRIPTION,
  RECIPE_SLUG_REQUIRED_ERROR,
  RECIPE_SLUG_MIN_LENGTH_ERROR,
  RECIPE_TITLE_REQUIRED_ERROR,
  RECIPE_TITLE_MIN_LENGTH_ERROR,
  RECIPE_TITLE_MAX_LENGTH_ERROR,
  RECIPE_DESCRIPTION_REQUIRED_ERROR,
  RECIPE_DESCRIPTION_MIN_LENGTH_ERROR,
  RECIPE_COOKING_TIME_POSITIVE_ERROR,
  RECIPE_COOKING_TIME_INT_ERROR,
  RECIPE_DIFFICULTY_ENUM_ERROR,
  RECIPE_TAGS_ARRAY_ERROR,
  RECIPE_STEPS_ARRAY_ERROR,
  RECIPE_STEPS_MIN_SIZE_ERROR,
  RECIPE_INGREDIENTS_ARRAY_ERROR,
  RECIPE_INGREDIENTS_MIN_SIZE_ERROR,
} from '../recipes.constants'

@InputType({ description: RECIPE_INPUT_DESCRIPTION })
export class RecipeInput {
  @Field(() => String, {
    nullable: false,
    description: RECIPE_SLUG_FIELD_DESCRIPTION,
  })
  @IsString({ message: RECIPE_SLUG_REQUIRED_ERROR })
  @IsNotEmpty({ message: RECIPE_SLUG_REQUIRED_ERROR })
  @MinLength(3, { message: RECIPE_SLUG_MIN_LENGTH_ERROR })
  slug!: string

  @Field(() => String, {
    nullable: false,
    description: RECIPE_TITLE_FIELD_DESCRIPTION,
  })
  @IsString({ message: RECIPE_TITLE_REQUIRED_ERROR })
  @IsNotEmpty({ message: RECIPE_TITLE_REQUIRED_ERROR })
  @MinLength(3, { message: RECIPE_TITLE_MIN_LENGTH_ERROR })
  @MaxLength(200, { message: RECIPE_TITLE_MAX_LENGTH_ERROR })
  title!: string

  @Field(() => String, {
    nullable: false,
    description: RECIPE_DESCRIPTION_FIELD_DESCRIPTION,
  })
  @IsString({ message: RECIPE_DESCRIPTION_REQUIRED_ERROR })
  @IsNotEmpty({ message: RECIPE_DESCRIPTION_REQUIRED_ERROR })
  @MinLength(10, { message: RECIPE_DESCRIPTION_MIN_LENGTH_ERROR })
  description!: string

  @Field(() => Int, {
    nullable: false,
    description: RECIPE_COOKING_TIME_FIELD_DESCRIPTION,
  })
  @IsInt({ message: RECIPE_COOKING_TIME_INT_ERROR })
  @IsPositive({ message: RECIPE_COOKING_TIME_POSITIVE_ERROR })
  cookingTime!: number

  @Field(() => DIFFICULTY, {
    nullable: false,
    description: RECIPE_DIFFICULTY_FIELD_DESCRIPTION,
  })
  @IsEnum(DIFFICULTY, { message: RECIPE_DIFFICULTY_ENUM_ERROR })
  difficulty!: `${DIFFICULTY}`

  @Field(() => NutritionFactInput, {
    nullable: true,
    description: RECIPE_NUTRITION_FACT_FIELD_DESCRIPTION,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionFactInput)
  nutritionFact?: NutritionFactInput

  @Field(() => [String], {
    nullable: true,
    description: RECIPE_TAGS_FIELD_DESCRIPTION,
  })
  @IsOptional()
  @IsArray({ message: RECIPE_TAGS_ARRAY_ERROR })
  tags?: string[]

  @Field(() => [RecipeStepInput], {
    nullable: true,
    description: RECIPE_STEPS_FIELD_DESCRIPTION,
  })
  @IsOptional()
  @IsArray({ message: RECIPE_STEPS_ARRAY_ERROR })
  @ArrayMinSize(1, { message: RECIPE_STEPS_MIN_SIZE_ERROR })
  @ValidateNested({ each: true })
  @Type(() => RecipeStepInput)
  recipeSteps?: RecipeStepInput[]

  @Field(() => [RecipeIngredientInput], {
    nullable: true,
    description: RECIPE_INGREDIENTS_FIELD_DESCRIPTION,
  })
  @IsOptional()
  @IsArray({ message: RECIPE_INGREDIENTS_ARRAY_ERROR })
  @ArrayMinSize(1, { message: RECIPE_INGREDIENTS_MIN_SIZE_ERROR })
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientInput)
  ingredients?: RecipeIngredientInput[]
}
