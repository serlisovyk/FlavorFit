import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prisma, RecipeIngredient } from '@prisma/generated/client';
import { UNIT } from '@prisma/generated/enums';
import { BaseModel } from '@/shared/models/base.model';
import { IngredientModel } from '../ingredients/models/ingredient.model';
import {
  RECIPE_INGREDIENT_MODEL_DESCRIPTION,
  RECIPE_INGREDIENT_MODEL_QUANTITY_FIELD_DESCRIPTION,
  RECIPE_INGREDIENT_MODEL_UNIT_FIELD_DESCRIPTION,
  RECIPE_INGREDIENT_MODEL_INGREDIENT_FIELD_DESCRIPTION,
  RECIPE_INGREDIENT_MODEL_RECIPE_ID_FIELD_DESCRIPTION,
  RECIPE_INGREDIENT_MODEL_INGREDIENT_ID_FIELD_DESCRIPTION,
} from '../recipes.constants';

@ObjectType({ description: RECIPE_INGREDIENT_MODEL_DESCRIPTION })
export class RecipeIngredientModel
  extends BaseModel
  implements RecipeIngredient
{
  @Field(() => Float, {
    nullable: false,
    description: RECIPE_INGREDIENT_MODEL_QUANTITY_FIELD_DESCRIPTION,
  })
  quantity!: Prisma.Decimal;

  @Field(() => UNIT, {
    defaultValue: UNIT.GRAM,
    nullable: false,
    description: RECIPE_INGREDIENT_MODEL_UNIT_FIELD_DESCRIPTION,
  })
  unit!: `${UNIT}`;

  @Field(() => IngredientModel, {
    nullable: false,
    description: RECIPE_INGREDIENT_MODEL_INGREDIENT_FIELD_DESCRIPTION,
  })
  ingredient?: IngredientModel;

  @Field(() => String, {
    nullable: false,
    description: RECIPE_INGREDIENT_MODEL_RECIPE_ID_FIELD_DESCRIPTION,
  })
  recipeId!: string;

  @Field(() => String, {
    nullable: false,
    description: RECIPE_INGREDIENT_MODEL_INGREDIENT_ID_FIELD_DESCRIPTION,
  })
  ingredientId!: string;
}
