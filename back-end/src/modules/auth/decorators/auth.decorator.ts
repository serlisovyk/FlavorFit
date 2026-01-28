import { applyDecorators, UseGuards } from '@nestjs/common';
import { ROLE } from '../../../../prisma/generated/prisma/enums';
import { GqlAuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

export function Auth(role: ROLE = ROLE.USER) {
  if (role === ROLE.ADMIN) {
    return applyDecorators(UseGuards(GqlAuthGuard, AdminGuard));
  }

  return applyDecorators(UseGuards(GqlAuthGuard));
}
