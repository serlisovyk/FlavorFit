import { ObjectType, Field } from '@nestjs/graphql'
import { Comment } from '@prisma/generated/client'
import { BaseModel } from '@/shared/models/base.model'

@ObjectType({ description: 'Comment details' })
export class CommentModel extends BaseModel implements Comment {
  @Field(() => String, {
    nullable: false,
    description: 'Comment content',
  })
  content!: string

  @Field(() => String, {
    nullable: false,
    description: 'Recipe ID',
  })
  recipeId!: string

  @Field(() => String, {
    nullable: false,
    description: 'Author user ID',
  })
  authorId!: string
}
