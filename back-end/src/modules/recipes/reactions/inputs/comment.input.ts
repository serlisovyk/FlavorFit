import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

@InputType({ description: 'Input for creating a new comment' })
export class CommentCreateInput {
  @Field(() => String, { description: 'Comment content' })
  @IsString({ message: 'Comment content is required' })
  @IsNotEmpty({ message: 'Comment content is required' })
  @MinLength(3, { message: 'Comment must be at least 3 characters' })
  @MaxLength(1000, {
    message: 'Comment must not exceed 1000 characters',
  })
  content!: string

  @Field(() => String, { description: 'Recipe ID' })
  @IsString({ message: 'Recipe ID is required' })
  @IsNotEmpty({ message: 'Recipe ID is required' })
  recipeId!: string
}

@InputType({ description: 'Input for updating a comment' })
export class CommentUpdateInput extends PartialType(CommentCreateInput) {}
