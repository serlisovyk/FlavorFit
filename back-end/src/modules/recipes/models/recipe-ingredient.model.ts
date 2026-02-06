import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { IngredientModel } from '../ingredients/models/ingredient.model';
import { UNIT } from '../enums/recipes.enums';

@ObjectType()
export class RecipeIngredientModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Float, { nullable: false })
  quantity!: number;

  @Field(() => UNIT, { defaultValue: 'GRAM', nullable: false })
  unit!: `${UNIT}`;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => IngredientModel, { nullable: false })
  ingredient?: IngredientModel;
}
