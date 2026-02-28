import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JWT_SECRET_ENV } from '@/shared/constants'
import { PrismaService } from '@/common/prisma/prisma.service'
import { UserModel } from '../users/models/user.model'
import { extractAccessTokenFromCookie } from './auth.utils'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractAccessTokenFromCookie]),
      secretOrKey: configService.getOrThrow<string>(JWT_SECRET_ENV),
    })
  }

  validate({ id }: UserModel) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        measurements: true,
      },
    })
  }
}
