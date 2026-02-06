import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { RecipeIngredientModel } from '@/modules/recipes/models/recipe-ingredient.model';

@ObjectType()
export class OrderItemModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Int, { defaultValue: 1, nullable: true })
  quantity!: number | null;

  @Field(() => String, { nullable: false })
  price!: string;

  @Field(() => RecipeIngredientModel, { nullable: false })
  recipeIngredient?: RecipeIngredientModel;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
