import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from '@/modules/auth/decorators/auth.decorator';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { CommentModel } from './models/comment.model';
import { ToggleLikeResponse } from './models/toggle-like.response';
import type {
  CommentCreateInput,
  CommentUpdateInput,
} from './inputs/comment.input';
import { ReactionService } from './reaction.service';

@Resolver()
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Mutation(() => CommentModel)
  @Auth()
  createComment(
    @CurrentUser('id') userId: string,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.reactionService.createComment(userId, input);
  }

  @Mutation(() => CommentModel)
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
    );
  }

  @Mutation(() => CommentModel)
  @Auth()
  deleteComment(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: string,
    @Args('commentId') commentId: string,
  ) {
    return this.reactionService.deleteComment(userId, userRole, commentId);
  }

  @Mutation(() => ToggleLikeResponse)
  @Auth()
  toggleLike(
    @CurrentUser('id') userId: string,
    @Args('recipeId') recipeId: string,
  ) {
    return this.reactionService.toggleLike(userId, recipeId);
  }
}
