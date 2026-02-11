import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prisma, OrderItem } from '@prisma/generated/client';
import { RecipeIngredientModel } from '@/modules/recipes/models/recipe-ingredient.model';
import { BaseModel } from '@/shared/models/base.model';
import {
  ORDER_ITEM_MODEL_DESCRIPTION,
  ORDER_ITEM_QUANTITY_FIELD_DESCRIPTION,
  ORDER_ITEM_PRICE_FIELD_DESCRIPTION,
  ORDER_ITEM_RECIPE_INGREDIENT_ID_FIELD_DESCRIPTION,
  ORDER_ITEM_ORDER_ID_FIELD_DESCRIPTION,
  ORDER_ITEM_RECIPE_INGREDIENT_FIELD_DESCRIPTION,
} from '../orders.constants';

@ObjectType({ description: ORDER_ITEM_MODEL_DESCRIPTION })
export class OrderItemModel extends BaseModel implements OrderItem {
  @Field(() => Float, {
    defaultValue: 1,
    nullable: true,
    description: ORDER_ITEM_QUANTITY_FIELD_DESCRIPTION,
  })
  quantity!: Prisma.Decimal | null;

  @Field(() => Float, {
    nullable: false,
    description: ORDER_ITEM_PRICE_FIELD_DESCRIPTION,
  })
  price!: Prisma.Decimal;

  @Field(() => String, {
    nullable: false,
    description: ORDER_ITEM_RECIPE_INGREDIENT_ID_FIELD_DESCRIPTION,
  })
  recipeIngredientId!: string;

  @Field(() => String, {
    nullable: false,
    description: ORDER_ITEM_ORDER_ID_FIELD_DESCRIPTION,
  })
  orderId!: string;

  @Field(() => RecipeIngredientModel, {
    nullable: false,
    description: ORDER_ITEM_RECIPE_INGREDIENT_FIELD_DESCRIPTION,
  })
  recipeIngredient?: RecipeIngredientModel;
}
