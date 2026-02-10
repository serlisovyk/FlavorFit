import { ForbiddenException, Injectable } from '@nestjs/common';
import { ROLE } from '@prisma/generated/prisma/enums';
import { PrismaService } from '@/prisma/prisma.service';
import { CommentCreateInput, CommentUpdateInput } from './inputs/comment.input';
import { COMMENT_NOT_FOUND_OR_UNAUTHORIZED_ERROR } from './reactions.constants';

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleLike(userId: string, recipeId: string) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        recipeId_userId: {
          recipeId,
          userId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.like.delete({
        where: { id: existingLike.id },
      });

      return { liked: false };
    } else {
      await this.prisma.like.create({
        data: {
          user: {
            connect: { id: userId },
          },
          recipe: {
            connect: { id: recipeId },
          },
        },
      });

      return { liked: true };
    }
  }

  createComment(userId: string, input: CommentCreateInput) {
    return this.prisma.comment.create({
      data: {
        content: input.content,
        author: {
          connect: { id: userId },
        },
        recipe: {
          connect: { id: input.recipeId },
        },
      },
    });
  }

  async updateComment(
    userId: string,
    userRole: string,
    commentId: string,
    input: CommentUpdateInput,
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || (comment.authorId !== userId && userRole !== ROLE.ADMIN)) {
      throw new ForbiddenException(COMMENT_NOT_FOUND_OR_UNAUTHORIZED_ERROR);
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { content: input.content },
      include: { author: true },
    });
  }

  async deleteComment(userId: string, userRole: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || (comment.authorId !== userId && userRole !== ROLE.ADMIN)) {
      throw new ForbiddenException(COMMENT_NOT_FOUND_OR_UNAUTHORIZED_ERROR);
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
