import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import {
  GraphQLContext,
  PreparedRequest,
  CurrentUser as TCurrentUser,
} from '@/shared/types'

export const CurrentUser = createParamDecorator(
  (data: keyof TCurrentUser, context: ExecutionContext) => {
    let user: TCurrentUser | null | undefined = null

    if (context.getType() === 'http') {
      user = context.switchToHttp().getRequest<PreparedRequest>().user
    } else {
      const graphqlContext = GqlExecutionContext.create(context)
      user = graphqlContext.getContext<GraphQLContext>().req.user
    }

    if (!user) return null

    return data ? user[data] : user
  },
)
