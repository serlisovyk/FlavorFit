import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import type { UserModel } from '../users/models/user.model';
import { JWT_SECRET_ENV } from '../../shared/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>(JWT_SECRET_ENV),
      ignoreExpiration: true,
    });
  }

  validate({ id }: UserModel): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        measurements: true,
      },
    });
  }
}
