import { ConfigService } from '@nestjs/config'
import { RESEND_API_KEY_ENV } from '../constants'

export function getResendConfig(configService: ConfigService) {
  return {
    apiKey: configService.getOrThrow<string>(RESEND_API_KEY_ENV),
  }
}
