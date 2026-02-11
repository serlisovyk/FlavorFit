import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from '@nestjs/apollo';
import { ROLE } from '@prisma/generated/enums';
import { FORBIDDEN_ERROR } from '../auth.constants';
import { RequestWithUser } from '../auth.interfaces';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<{ req: RequestWithUser }>().req.user;

    if (user?.role !== ROLE.ADMIN) {
      throw new ForbiddenError(FORBIDDEN_ERROR);
    }

    return true;
  }
}
