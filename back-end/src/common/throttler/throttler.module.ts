import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule as ThrottlerModuleBase } from '@nestjs/throttler'
import { getThrottlerConfig } from './throttler.config'
import { GqlThrottlerGuard } from './gql-throttler.guard'

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
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class ThrottlerModule {}
