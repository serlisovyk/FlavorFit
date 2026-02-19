import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Recipe } from '@prisma/generated/client'
import { DIFFICULTY } from '@prisma/generated/enums'
import { BaseModel } from '@/shared/models/base.model'
import { NutritionFactModel } from './nutrition-fact.model'
import { RecipeTagModel } from './recipe-tag.model'
import { RecipeIngredientModel } from './recipe-ingredient.model'
import { RecipeStepModel } from './recipe-steps.model'
import '../enums/recipes.enums'

@ObjectType({ description: 'Recipe details' })
export class RecipeModel extends BaseModel implements Recipe {
  @Field(() => String, {
    nullable: false,
    description: 'Recipe URL slug',
  })
  slug!: string

  @Field(() => String, {
    nullable: false,
    description: 'Recipe title',
  })
  title!: string

  @Field(() => String, {
    nullable: false,
    description: 'Recipe description',
  })
  description!: string

  @Field(() => Int, {
    nullable: false,
    description: 'Cooking time in minutes',
  })
  cookingTime!: number

  @Field(() => Int, {
    nullable: false,
    description: 'Number of views',
  })
  views!: number

  @Field(() => DIFFICULTY, {
    nullable: false,
    description: 'Recipe difficulty level',
  })
  difficulty!: `${DIFFICULTY}`

  @Field(() => NutritionFactModel, {
    nullable: true,
    description: 'Nutrition facts',
  })
  nutritionFact?: NutritionFactModel

  @Field(() => [RecipeTagModel], {
    nullable: true,
    description: 'Recipe tags',
  })
  tags?: RecipeTagModel[]

  @Field(() => [RecipeIngredientModel], {
    nullable: true,
    description: 'Recipe ingredients',
  })
  recipeIngredients?: RecipeIngredientModel[]

  @Field(() => [RecipeStepModel], {
    nullable: true,
    description: 'Recipe steps',
  })
  recipeSteps?: RecipeStepModel[]

  // @Field(() => [Comment], { nullable: true })
  // comments?: Comment[];

  @Field(() => [Int], {
    nullable: true,
    description: 'User IDs who liked the recipe',
  })
  likes?: number[]

  @Field(() => String, {
    nullable: false,
    description: 'Author user ID',
  })
  authorId!: string
}
