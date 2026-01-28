import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  RequestWithUser,
  CurrentUser as TCurrentUser,
} from '../auth.interfaces';

export const CurrentUser = createParamDecorator(
  (data: keyof TCurrentUser, context: ExecutionContext) => {
    let user: TCurrentUser | null | undefined = null;

    if (context.getType() === 'http') {
      user = context.switchToHttp().getRequest<RequestWithUser>().user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      user = ctx.getContext<{ req: RequestWithUser }>().req.user;
    }

    if (!user) return null;

    return data ? user[data] : user;
  },
);
