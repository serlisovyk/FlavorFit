import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { hash } from 'argon2';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthInput } from './auth.input';
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN_ENV,
  JWT_REFRESH_TOKEN_EXPIRES_IN_ENV,
  REGISTRATION_FAILED_ERROR,
  USER_ALREADY_EXISTS_ERROR,
} from './auth.constants';
import { AuthTokenData } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async register(input: AuthInput) {
    try {
      const preparedEmail = input.email.toLowerCase();

      // TODO: Move to user service
      const isExistingUser = await this.prisma.user.findFirst({
        where: {
          email: {
            equals: preparedEmail,
            mode: 'insensitive',
          },
        },
      });

      if (isExistingUser) {
        throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
      }

      // TODO: Move to user service
      const newUser = await this.prisma.user.create({
        data: {
          email: preparedEmail,
          password: await hash(input.password),
        },
      });

      const tokens = this.generateTokens({
        id: newUser.id,
        role: newUser.role,
      });

      return { user: newUser, ...tokens };
    } catch (error) {
      throw new BadRequestException(REGISTRATION_FAILED_ERROR + error);
    }
  }

  private generateTokens(data: AuthTokenData) {
    const accessToken = this.jwt.sign(data, {
      expiresIn: this.configService.get<StringValue>(
        JWT_ACCESS_TOKEN_EXPIRES_IN_ENV,
      ),
    });

    const refreshToken = this.jwt.sign(
      { id: data.id },
      {
        expiresIn: this.configService.get<StringValue>(
          JWT_REFRESH_TOKEN_EXPIRES_IN_ENV,
        ),
      },
    );

    return { accessToken, refreshToken };
  }
}
