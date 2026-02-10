import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prisma, NutritionFact } from '@prisma/generated/prisma/client';
import { BaseModel } from '@/shared/models/base.model';
import {
  NUTRITION_FACT_MODEL_DESCRIPTION,
  NUTRITION_FACT_CALORIES_FIELD_DESCRIPTION,
  NUTRITION_FACT_PROTEINS_FIELD_DESCRIPTION,
  NUTRITION_FACT_FATS_FIELD_DESCRIPTION,
  NUTRITION_FACT_CARBOHYDRATES_FIELD_DESCRIPTION,
  NUTRITION_FACT_FIBER_FIELD_DESCRIPTION,
  NUTRITION_FACT_RECIPE_ID_FIELD_DESCRIPTION,
} from '../recipes.constants';

@ObjectType({ description: NUTRITION_FACT_MODEL_DESCRIPTION })
export class NutritionFactModel extends BaseModel implements NutritionFact {
  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_FACT_CALORIES_FIELD_DESCRIPTION,
  })
  calories!: Prisma.Decimal;

  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_FACT_PROTEINS_FIELD_DESCRIPTION,
  })
  proteins!: Prisma.Decimal;

  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_FACT_FATS_FIELD_DESCRIPTION,
  })
  fats!: Prisma.Decimal;

  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_FACT_CARBOHYDRATES_FIELD_DESCRIPTION,
  })
  carbohydrates!: Prisma.Decimal;

  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_FACT_FIBER_FIELD_DESCRIPTION,
  })
  fiber!: Prisma.Decimal;

  @Field(() => String, {
    nullable: false,
    description: NUTRITION_FACT_RECIPE_ID_FIELD_DESCRIPTION,
  })
  recipeId!: string;
}
