import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { TurnstileService } from 'nest-cloudflare-turnstile/dist/services/turnstile.service'
import { TURNSTILE_TOKEN_HEADER } from '@/shared/constants'
import { GraphQLContext } from '@/shared/types'
import { TurnstileResponse } from '../auth.interfaces'
import {
  CAPTCHA_TOKEN_IS_REQUIRED_ERROR,
  INVALID_CAPTCHA_TOKEN_ERROR,
} from '../auth.constants'

@Injectable()
export class CaptchaGuard implements CanActivate {
  constructor(private readonly turnstileService: TurnstileService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const graphqlContext = GqlExecutionContext.create(context)

    const request = graphqlContext.getContext<GraphQLContext>().req

    const token = request.headers[TURNSTILE_TOKEN_HEADER]

    if (!token) throw new BadRequestException(CAPTCHA_TOKEN_IS_REQUIRED_ERROR)

    const tokenValue = Array.isArray(token) ? token[0] : token

    const { success } = (await this.turnstileService.validateToken(
      tokenValue,
    )) as TurnstileResponse

    if (!success) throw new BadRequestException(INVALID_CAPTCHA_TOKEN_ERROR)

    return true
  }
}
