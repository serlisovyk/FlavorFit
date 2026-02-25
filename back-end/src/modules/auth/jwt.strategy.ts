import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from '../../prisma/prisma.service'
import { UserModel } from '../users/models/user.model'
import { JWT_SECRET_ENV } from '../../shared/constants'
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

  validate({ id }: UserModel): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        measurements: true,
      },
    })
  }
}
