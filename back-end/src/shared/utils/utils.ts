import { ConfigService } from '@nestjs/config'
import { randomBytes } from 'crypto'
import { MODE_ENV } from '../constants'
import { MODE } from '../types'

export function isDev(configService: ConfigService): boolean {
  return configService.get<string>(MODE_ENV) === MODE.DEVELOPMENT
}

export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex')
}
