import { applyDecorators, UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../guards/auth.guard'
import { AdminGuard } from '../guards/admin.guard'

export function Admin() {
  return applyDecorators(UseGuards(GqlAuthGuard, AdminGuard))
}
