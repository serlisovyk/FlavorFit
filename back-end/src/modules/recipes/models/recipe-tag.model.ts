import { ObjectType, Field } from '@nestjs/graphql'
import { RecipeTag } from '@prisma/generated/client'
import { BaseModel } from '@/shared/models/base.model'

@ObjectType({ description: 'Recipe tag details' })
export class RecipeTagModel extends BaseModel implements RecipeTag {
  @Field(() => String, {
    nullable: false,
    description: 'Tag name',
  })
  name!: string
}
