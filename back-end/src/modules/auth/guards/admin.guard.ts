import { CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ForbiddenError } from '@nestjs/apollo'
import { ROLE } from '@prisma/generated/enums'
import { GraphQLContext } from '@/shared/types'
import { FORBIDDEN_ERROR } from '../auth.constants'

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context)
    const user = graphqlContext.getContext<GraphQLContext>().req.user

    if (user?.role !== ROLE.ADMIN) throw new ForbiddenError(FORBIDDEN_ERROR)

    return true
  }
}
