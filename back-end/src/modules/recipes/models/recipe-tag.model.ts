import { ObjectType, Field } from '@nestjs/graphql'
import { RecipeTag } from '@prisma/generated/client'
import { BaseModel } from '@/shared/models/base.model'
import {
  RECIPE_TAG_MODEL_DESCRIPTION,
  RECIPE_TAG_MODEL_NAME_FIELD_DESCRIPTION,
} from '../recipes.constants'

@ObjectType({ description: RECIPE_TAG_MODEL_DESCRIPTION })
export class RecipeTagModel extends BaseModel implements RecipeTag {
  @Field(() => String, {
    nullable: false,
    description: RECIPE_TAG_MODEL_NAME_FIELD_DESCRIPTION,
  })
  name!: string
}
