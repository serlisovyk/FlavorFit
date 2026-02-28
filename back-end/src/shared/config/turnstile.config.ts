import { ConfigService } from '@nestjs/config'
import { ITurnstileOptions } from 'nest-cloudflare-turnstile'
import { Request } from 'express'
import {
  CLOUDFLARE_TURNSTILE_SECRET_KEY_ENV,
  TURNSTILE_TOKEN_HEADER,
} from '../constants'

export function getTurnstileConfig(
  configService: ConfigService,
): ITurnstileOptions {
  const secretKey = configService.getOrThrow<string>(
    CLOUDFLARE_TURNSTILE_SECRET_KEY_ENV,
  )

  const tokenResponse = (request: Request): string => {
    const token = request.headers[TURNSTILE_TOKEN_HEADER]
    return Array.isArray(token) ? token[0] : token || ''
  }

  return {
    secretKey,
    tokenResponse,
  }
}
