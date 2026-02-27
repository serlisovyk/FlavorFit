import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ThrottlerModule } from '@nestjs/throttler'
import { TurnstileModule } from 'nest-cloudflare-turnstile'
import { ResendModule } from 'nestjs-resend'
import { PrismaModule } from './prisma/prisma.module'
import { EmailModule } from './email/email.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { RecipesModule } from './modules/recipes/recipes.module'
import { OrdersModule } from './modules/orders/orders.module'
import {
  getGraphQLConfig,
  getResendConfig,
  getThrottlerConfig,
  getTurnstileConfig,
} from './shared/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getThrottlerConfig,
      inject: [ConfigService],
    }),
    TurnstileModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTurnstileConfig,
      inject: [ConfigService],
    }),
    ResendModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getResendConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    EmailModule,
    AuthModule,
    UsersModule,
    RecipesModule,
    OrdersModule,
  ],
})
export class AppModule {}
