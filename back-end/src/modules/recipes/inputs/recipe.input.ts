import { InputType, Field, Int } from '@nestjs/graphql';
import { DIFFICULTY } from '../enums/recipes.enums';
import { NutritionFactInput } from './nutrition-fact.input';
import { RecipeStepInput } from './recipe-step.input';
import { RecipeIngredientInput } from './recipe-ingredient.input';

@InputType()
export class RecipeInput {
  @Field(() => String, { nullable: false })
  slug!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => Int, { nullable: false })
  cookingTime!: number;

  @Field(() => DIFFICULTY, { nullable: false })
  difficulty!: `${DIFFICULTY}`;

  @Field(() => NutritionFactInput, { nullable: true })
  nutritionFact?: NutritionFactInput;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [RecipeStepInput], { nullable: true })
  recipeSteps?: RecipeStepInput[];

  @Field(() => [RecipeIngredientInput], { nullable: true })
  ingredients?: RecipeIngredientInput[];
}
