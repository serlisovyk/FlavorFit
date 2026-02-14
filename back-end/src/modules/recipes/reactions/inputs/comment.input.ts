import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import {
  COMMENT_CREATE_INPUT_DESCRIPTION,
  COMMENT_UPDATE_INPUT_DESCRIPTION,
  COMMENT_CONTENT_FIELD_DESCRIPTION,
  COMMENT_RECIPE_ID_FIELD_DESCRIPTION,
  COMMENT_CONTENT_REQUIRED_ERROR,
  COMMENT_CONTENT_MIN_LENGTH_ERROR,
  COMMENT_CONTENT_MAX_LENGTH_ERROR,
  COMMENT_RECIPE_ID_REQUIRED_ERROR,
} from '../reactions.constants'

@InputType({ description: COMMENT_CREATE_INPUT_DESCRIPTION })
export class CommentCreateInput {
  @Field(() => String, { description: COMMENT_CONTENT_FIELD_DESCRIPTION })
  @IsString({ message: COMMENT_CONTENT_REQUIRED_ERROR })
  @IsNotEmpty({ message: COMMENT_CONTENT_REQUIRED_ERROR })
  @MinLength(3, { message: COMMENT_CONTENT_MIN_LENGTH_ERROR })
  @MaxLength(1000, { message: COMMENT_CONTENT_MAX_LENGTH_ERROR })
  content!: string

  @Field(() => String, { description: COMMENT_RECIPE_ID_FIELD_DESCRIPTION })
  @IsString({ message: COMMENT_RECIPE_ID_REQUIRED_ERROR })
  @IsNotEmpty({ message: COMMENT_RECIPE_ID_REQUIRED_ERROR })
  recipeId!: string
}

@InputType({ description: COMMENT_UPDATE_INPUT_DESCRIPTION })
export class CommentUpdateInput extends PartialType(CommentCreateInput) {}
