import { applyDecorators, UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../guards/auth.guard'

export function Auth() {
  return applyDecorators(UseGuards(GqlAuthGuard))
}
