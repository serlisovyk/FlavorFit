import { ObjectType, Field, Int } from '@nestjs/graphql'
import { RecipeStep } from '@prisma/generated/client'
import { BaseModel } from '@/shared/models/base.model'

@ObjectType({ description: 'Recipe step details' })
export class RecipeStepModel extends BaseModel implements RecipeStep {
  @Field(() => Int, {
    nullable: false,
    description: 'Step order number',
  })
  order!: number

  @Field(() => String, {
    nullable: false,
    description: 'Step title',
  })
  title!: string

  @Field(() => String, {
    nullable: false,
    description: 'Step description',
  })
  description!: string

  @Field(() => String, {
    nullable: false,
    description: 'Recipe ID',
  })
  recipeId!: string
}
