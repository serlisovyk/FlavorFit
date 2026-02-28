import { ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GraphQLContext } from '@/shared/types'

export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context)
    return graphqlContext.getContext<GraphQLContext>().req
  }
}
