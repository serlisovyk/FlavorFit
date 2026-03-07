import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ThrottlerGuard } from '@nestjs/throttler'
import { GraphQLContext, PreparedRequest } from '@/shared/types'
import { Response } from 'express'

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    if (context.getType() === 'http') {
      const httpContext = context.switchToHttp()

      const req = httpContext.getRequest<PreparedRequest>()
      const res = httpContext.getResponse<Response>()

      return { req, res }
    }

    const graphqlContext = GqlExecutionContext.create(context)

    const { req, res } = graphqlContext.getContext<GraphQLContext>()

    return { req, res }
  }
}
