import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ThrottlerGuard,
  ThrottlerModule as ThrottlerModuleBase,
} from '@nestjs/throttler'
import { getThrottlerConfig } from './throttler.config'

@Module({
  imports: [
    ThrottlerModuleBase.forRootAsync({
      useFactory: getThrottlerConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlerModule {}
