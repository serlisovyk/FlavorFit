import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { JWT_SECRET_ENV } from '../constants'

export function getJwtConfig(configService: ConfigService): JwtModuleOptions {
  return {
    secret: configService.get<string>(JWT_SECRET_ENV),
  }
}
