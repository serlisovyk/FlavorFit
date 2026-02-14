import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Auth } from '@/modules/auth/decorators/auth.decorator'
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator'
import { CommentModel } from './models/comment.model'
import { ToggleLikeResponse } from './models/toggle-like.response'
import { CommentCreateInput, CommentUpdateInput } from './inputs/comment.input'
import { ReactionsService } from './reactions.service'
import {
  CREATE_COMMENT_MUTATION_DESCRIPTION,
  UPDATE_COMMENT_MUTATION_DESCRIPTION,
  DELETE_COMMENT_MUTATION_DESCRIPTION,
  TOGGLE_LIKE_MUTATION_DESCRIPTION,
} from './reactions.constants'

@Resolver()
export class ReactionsResolver {
  constructor(private readonly reactionService: ReactionsService) {}

  @Mutation(() => CommentModel, {
    name: 'createComment',
    description: CREATE_COMMENT_MUTATION_DESCRIPTION,
  })
  @Auth()
  createComment(
    @CurrentUser('id') userId: string,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.reactionService.createComment(userId, input)
  }

  @Mutation(() => CommentModel, {
    name: 'updateComment',
    description: UPDATE_COMMENT_MUTATION_DESCRIPTION,
  })
  @Auth()
  updateComment(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
    @Args('commentId') commentId: string,
    @Args('input') input: CommentUpdateInput,
  ) {
    return this.reactionService.updateComment(
      userId,
      userRole,
      commentId,
      input,
    )
  }

  @Mutation(() => CommentModel, {
    name: 'deleteComment',
    description: DELETE_COMMENT_MUTATION_DESCRIPTION,
  })
  @Auth()
  deleteComment(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
    @Args('commentId') commentId: string,
  ) {
    return this.reactionService.deleteComment(userId, userRole, commentId)
  }

  @Mutation(() => ToggleLikeResponse, {
    name: 'toggleLike',
    description: TOGGLE_LIKE_MUTATION_DESCRIPTION,
  })
  @Auth()
  toggleLike(
    @CurrentUser('id') userId: string,
    @Args('recipeId') recipeId: string,
  ) {
    return this.reactionService.toggleLike(userId, recipeId)
  }
}
