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

@InputType({ description: 'Recipe input' })
export class RecipeInput {
  @Field(() => String, {
    nullable: false,
    description: 'Recipe URL slug',
  })
  @IsString({ message: 'Slug is required' })
  @IsNotEmpty({ message: 'Slug is required' })
  @MinLength(3, { message: 'Slug must be at least 3 characters' })
  slug!: string

  @Field(() => String, {
    nullable: false,
    description: 'Recipe title',
  })
  @IsString({ message: 'Title is required' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title!: string

  @Field(() => String, {
    nullable: false,
    description: 'Recipe description',
  })
  @IsString({ message: 'Description is required' })
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  description!: string

  @Field(() => Int, {
    nullable: false,
    description: 'Cooking time in minutes',
  })
  @IsInt({ message: 'Cooking time must be an integer' })
  @IsPositive({ message: 'Cooking time must be positive' })
  cookingTime!: number

  @Field(() => DIFFICULTY, {
    nullable: false,
    description: 'Recipe difficulty level',
  })
  @IsEnum(DIFFICULTY, {
    message: 'Difficulty must be a valid difficulty level',
  })
  difficulty!: `${DIFFICULTY}`

  @Field(() => NutritionFactInput, {
    nullable: true,
    description: 'Nutrition facts',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionFactInput)
  nutritionFact?: NutritionFactInput

  @Field(() => [String], {
    nullable: true,
    description: 'Recipe tags',
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  tags?: string[]

  @Field(() => [RecipeStepInput], {
    nullable: true,
    description: 'Recipe steps',
  })
  @IsOptional()
  @IsArray({ message: 'Steps must be an array' })
  @ArrayMinSize(1, { message: 'Recipe must have at least one step' })
  @ValidateNested({ each: true })
  @Type(() => RecipeStepInput)
  recipeSteps?: RecipeStepInput[]

  @Field(() => [RecipeIngredientInput], {
    nullable: true,
    description: 'Recipe ingredients',
  })
  @IsOptional()
  @IsArray({ message: 'Ingredients must be an array' })
  @ArrayMinSize(1, { message: 'Recipe must have at least one ingredient' })
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientInput)
  ingredients?: RecipeIngredientInput[]
}
