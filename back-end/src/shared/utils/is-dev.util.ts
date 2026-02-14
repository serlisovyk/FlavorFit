import { ConfigService } from '@nestjs/config'
import { MODE_ENV } from '../constants'
import { MODE } from '../types'

export function isDev(configService: ConfigService): boolean {
  return configService.get<string>(MODE_ENV) === MODE.DEVELOPMENT
}
