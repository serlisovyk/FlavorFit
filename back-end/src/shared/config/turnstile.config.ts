import { ConfigService } from '@nestjs/config'
import { ITurnstileOptions } from 'nest-cloudflare-turnstile'
import { Request } from 'express'
import { CLOUDFLARE_TURNSTILE_SECRET_KEY_ENV } from '../constants'

export function getTurnstileConfig(
  configService: ConfigService,
): ITurnstileOptions {
  const secretKey = configService.getOrThrow<string>(
    CLOUDFLARE_TURNSTILE_SECRET_KEY_ENV,
  )

  const tokenResponse = (request: Request) =>
    request.headers['cf-turnstile-token'] as string

  return {
    secretKey,
    tokenResponse,
  }
}
