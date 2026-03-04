import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ThrottlerModule } from '@nestjs/throttler'
import { TurnstileModule } from 'nest-cloudflare-turnstile'
import { ResendModule } from 'nestjs-resend'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { RecipesModule } from './modules/recipes/recipes.module'
import { OrdersModule } from './modules/orders/orders.module'
import { UploadModule } from './modules/upload/upload.module';
import { PrismaModule } from './common/prisma/prisma.module'
import { EmailModule } from './common/email/email.module'
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
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: getThrottlerConfig,
      inject: [ConfigService],
    }),
    TurnstileModule.forRootAsync({
      useFactory: getTurnstileConfig,
      inject: [ConfigService],
    }),
    ResendModule.forRootAsync({
      useFactory: getResendConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    EmailModule,
    UploadModule,
    AuthModule,
    UsersModule,
    RecipesModule,
    OrdersModule,
  ],
})
export class AppModule {}
