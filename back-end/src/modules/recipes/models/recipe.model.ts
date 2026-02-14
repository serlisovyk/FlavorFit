import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Recipe } from '@prisma/generated/client'
import { DIFFICULTY } from '@prisma/generated/enums'
import { BaseModel } from '@/shared/models/base.model'
import { NutritionFactModel } from './nutrition-fact.model'
import { RecipeTagModel } from './recipe-tag.model'
import { RecipeIngredientModel } from './recipe-ingredient.model'
import { RecipeStepModel } from './recipe-steps.model'
import {
  RECIPE_MODEL_DESCRIPTION,
  RECIPE_MODEL_SLUG_FIELD_DESCRIPTION,
  RECIPE_MODEL_TITLE_FIELD_DESCRIPTION,
  RECIPE_MODEL_DESCRIPTION_FIELD_DESCRIPTION,
  RECIPE_MODEL_COOKING_TIME_FIELD_DESCRIPTION,
  RECIPE_MODEL_VIEWS_FIELD_DESCRIPTION,
  RECIPE_MODEL_DIFFICULTY_FIELD_DESCRIPTION,
  RECIPE_MODEL_NUTRITION_FACT_FIELD_DESCRIPTION,
  RECIPE_MODEL_TAGS_FIELD_DESCRIPTION,
  RECIPE_MODEL_INGREDIENTS_FIELD_DESCRIPTION,
  RECIPE_MODEL_STEPS_FIELD_DESCRIPTION,
  RECIPE_MODEL_LIKES_FIELD_DESCRIPTION,
  RECIPE_MODEL_AUTHOR_ID_FIELD_DESCRIPTION,
} from '../recipes.constants'
import '../enums/recipes.enums'

@ObjectType({ description: RECIPE_MODEL_DESCRIPTION })
export class RecipeModel extends BaseModel implements Recipe {
  @Field(() => String, {
    nullable: false,
    description: RECIPE_MODEL_SLUG_FIELD_DESCRIPTION,
  })
  slug!: string

  @Field(() => String, {
    nullable: false,
    description: RECIPE_MODEL_TITLE_FIELD_DESCRIPTION,
  })
  title!: string

  @Field(() => String, {
    nullable: false,
    description: RECIPE_MODEL_DESCRIPTION_FIELD_DESCRIPTION,
  })
  description!: string

  @Field(() => Int, {
    nullable: false,
    description: RECIPE_MODEL_COOKING_TIME_FIELD_DESCRIPTION,
  })
  cookingTime!: number

  @Field(() => Int, {
    nullable: false,
    description: RECIPE_MODEL_VIEWS_FIELD_DESCRIPTION,
  })
  views!: number

  @Field(() => DIFFICULTY, {
    nullable: false,
    description: RECIPE_MODEL_DIFFICULTY_FIELD_DESCRIPTION,
  })
  difficulty!: `${DIFFICULTY}`

  @Field(() => NutritionFactModel, {
    nullable: true,
    description: RECIPE_MODEL_NUTRITION_FACT_FIELD_DESCRIPTION,
  })
  nutritionFact?: NutritionFactModel

  @Field(() => [RecipeTagModel], {
    nullable: true,
    description: RECIPE_MODEL_TAGS_FIELD_DESCRIPTION,
  })
  tags?: RecipeTagModel[]

  @Field(() => [RecipeIngredientModel], {
    nullable: true,
    description: RECIPE_MODEL_INGREDIENTS_FIELD_DESCRIPTION,
  })
  recipeIngredients?: RecipeIngredientModel[]

  @Field(() => [RecipeStepModel], {
    nullable: true,
    description: RECIPE_MODEL_STEPS_FIELD_DESCRIPTION,
  })
  recipeSteps?: RecipeStepModel[]

  // @Field(() => [Comment], { nullable: true })
  // comments?: Comment[];

  @Field(() => [Int], {
    nullable: true,
    description: RECIPE_MODEL_LIKES_FIELD_DESCRIPTION,
  })
  likes?: number[]

  @Field(() => String, {
    nullable: false,
    description: RECIPE_MODEL_AUTHOR_ID_FIELD_DESCRIPTION,
  })
  authorId!: string
}
