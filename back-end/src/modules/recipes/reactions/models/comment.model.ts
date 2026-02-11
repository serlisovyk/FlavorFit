import { ObjectType, Field } from '@nestjs/graphql';
import { Comment } from '@prisma/generated/client';
import { BaseModel } from '@/shared/models/base.model';
import {
  COMMENT_MODEL_DESCRIPTION,
  COMMENT_CONTENT_FIELD_DESCRIPTION,
  COMMENT_RECIPE_ID_FIELD_DESCRIPTION,
  COMMENT_AUTHOR_ID_FIELD_DESCRIPTION,
} from '../reactions.constants';

@ObjectType({ description: COMMENT_MODEL_DESCRIPTION })
export class CommentModel extends BaseModel implements Comment {
  @Field(() => String, {
    nullable: false,
    description: COMMENT_CONTENT_FIELD_DESCRIPTION,
  })
  content!: string;

  @Field(() => String, {
    nullable: false,
    description: COMMENT_RECIPE_ID_FIELD_DESCRIPTION,
  })
  recipeId!: string;

  @Field(() => String, {
    nullable: false,
    description: COMMENT_AUTHOR_ID_FIELD_DESCRIPTION,
  })
  authorId!: string;
}
