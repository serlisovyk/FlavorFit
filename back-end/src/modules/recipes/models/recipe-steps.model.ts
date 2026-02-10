import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RecipeStep } from '@prisma/generated/prisma/client';
import { BaseModel } from '@/shared/models/base.model';
import {
  RECIPE_STEP_MODEL_DESCRIPTION,
  RECIPE_STEP_MODEL_ORDER_FIELD_DESCRIPTION,
  RECIPE_STEP_MODEL_TITLE_FIELD_DESCRIPTION,
  RECIPE_STEP_MODEL_DESCRIPTION_FIELD_DESCRIPTION,
  RECIPE_STEP_MODEL_RECIPE_ID_FIELD_DESCRIPTION,
} from '../recipes.constants';

@ObjectType({ description: RECIPE_STEP_MODEL_DESCRIPTION })
export class RecipeStepModel extends BaseModel implements RecipeStep {
  @Field(() => Int, {
    nullable: false,
    description: RECIPE_STEP_MODEL_ORDER_FIELD_DESCRIPTION,
  })
  order!: number;

  @Field(() => String, {
    nullable: false,
    description: RECIPE_STEP_MODEL_TITLE_FIELD_DESCRIPTION,
  })
  title!: string;

  @Field(() => String, {
    nullable: false,
    description: RECIPE_STEP_MODEL_DESCRIPTION_FIELD_DESCRIPTION,
  })
  description!: string;

  @Field(() => String, {
    nullable: false,
    description: RECIPE_STEP_MODEL_RECIPE_ID_FIELD_DESCRIPTION,
  })
  recipeId!: string;
}
