import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '@prisma/generated/graphql/user';
import { DIFFICULTY } from '../enums/recipes.enums';
import { NutritionFactModel } from './nutrition-fact.model';
import { RecipeTagModel } from './recipe-tag.model';
import { RecipeStepModel } from './recipe-steps.model';
import { RecipeIngredientModel } from './recipe-ingredient.model';

@ObjectType()
export class RecipeModel {
  @Field(() => ID, { nullable: false })
  id!: string;

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

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => User, { nullable: false })
  author?: User;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => NutritionFactModel, { nullable: true })
  nutritionFact?: NutritionFactModel | null;

  @Field(() => [RecipeTagModel], { nullable: true })
  tags?: RecipeTagModel[];

  @Field(() => [RecipeIngredientModel], { nullable: true })
  recipeIngredients?: RecipeIngredientModel[];

  @Field(() => [RecipeStepModel], { nullable: true })
  recipeSteps?: RecipeStepModel[];

  @Field(() => [Int], { nullable: true })
  likes?: number[];

  // @Field(() => [Comment], { nullable: true })
  // comments?: Comment[];
}
