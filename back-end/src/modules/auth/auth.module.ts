import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { getJwtConfig } from '@/shared/config'
import { EmailModule } from '@/common/email/email.module'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './jwt.strategy'
import { AuthAccountService } from './auth-account/auth-account.service'
import { AuthService } from './auth.service'
import { AuthAccountResolver } from './auth-account/auth-account.resolver'
import { AuthResolver } from './auth.resolver'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UsersModule,
    EmailModule,
  ],
  providers: [
    JwtStrategy,
    AuthService,
    AuthAccountService,
    AuthResolver,
    AuthAccountResolver,
  ],
})
export class AuthModule {}
