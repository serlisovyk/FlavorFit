import { ObjectType, Field, Float } from '@nestjs/graphql';
import {
  UNIT,
  type Ingredient,
  type Prisma,
} from '@prisma/generated/prisma/client';
import { BaseModel } from '@/shared/models/base.model';
import {
  INGREDIENT_MODEL_DESCRIPTION,
  INGREDIENT_NAME_FIELD_DESCRIPTION,
  INGREDIENT_ICON_URL_FIELD_DESCRIPTION,
  INGREDIENT_CONTENT_FIELD_DESCRIPTION,
  INGREDIENT_PRICE_FIELD_DESCRIPTION,
  INGREDIENT_DEFAULT_UNIT_FIELD_DESCRIPTION,
} from '../ingredients.constants';

@ObjectType({ description: INGREDIENT_MODEL_DESCRIPTION })
export class IngredientModel extends BaseModel implements Ingredient {
  @Field(() => String, {
    nullable: false,
    description: INGREDIENT_NAME_FIELD_DESCRIPTION,
  })
  name!: string;

  @Field(() => String, {
    nullable: false,
    description: INGREDIENT_ICON_URL_FIELD_DESCRIPTION,
  })
  iconUrl!: string;

  @Field(() => String, {
    nullable: false,
    description: INGREDIENT_CONTENT_FIELD_DESCRIPTION,
  })
  content!: string;

  @Field(() => Float, {
    nullable: false,
    description: INGREDIENT_PRICE_FIELD_DESCRIPTION,
  })
  price!: Prisma.Decimal;

  @Field(() => UNIT, {
    nullable: false,
    description: INGREDIENT_DEFAULT_UNIT_FIELD_DESCRIPTION,
  })
  defaultUnit!: `${UNIT}`;
}
