import { InputType, Field, ID } from '@nestjs/graphql';
import { UNIT } from '@prisma/generated/prisma/enums';

@InputType()
export class RecipeIngredientInput {
  @Field(() => ID)
  ingredientId!: string;

  @Field(() => Number)
  quantity!: number;

  @Field(() => UNIT)
  unit!: UNIT;
}
