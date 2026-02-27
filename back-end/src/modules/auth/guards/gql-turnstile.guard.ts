import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { TurnstileService } from 'nest-cloudflare-turnstile/dist/services/turnstile.service'
import { GraphQLContext } from '@/shared/types'

interface TurnstileServiceOptions {
  secretKey: string
}

interface TurnstileResponse {
  success: boolean
}

@Injectable()
export class GqlTurnstileGuard implements CanActivate {
  constructor(
    private readonly turnstileService: TurnstileService,
    @Inject('TurnstileServiceOptions')
    private readonly options: TurnstileServiceOptions,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context)

    const request = gqlContext.getContext<GraphQLContext>().req
    const token = request.headers['cf-turnstile-token']

    if (!token) throw new BadRequestException('Captcha token is required')

    const { success } = (await this.turnstileService.validateToken(
      token as string,
    )) as TurnstileResponse

    if (!success) {
      throw new BadRequestException('Invalid captcha token')
    }

    return true
  }
}
