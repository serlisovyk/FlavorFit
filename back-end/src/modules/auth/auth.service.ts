import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { verify } from 'argon2';
import { Response } from 'express';
import { isDev } from '../../shared/utils';
import { UsersService } from '../users/users.service';
import { AuthInput } from './auth.input';
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN_ENV,
  JWT_REFRESH_TOKEN_EXPIRES_IN_ENV,
  JWT_REFRESH_TOKEN_EXPIRES_DAYS_ENV,
  COOKIE_DOMAIN_ENV,
  REFRESH_TOKEN_COOKIE_NAME,
  REGISTRATION_FAILED_ERROR,
  EMAIL_OR_PASSWORD_INVALID_ERROR,
  INVALID_REFRESH_TOKEN_ERROR,
  USER_NOT_FOUND_ERROR,
} from './auth.constants';
import { AuthTokenData } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(input: AuthInput) {
    try {
      const preparedEmail = input.email.toLowerCase();

      const newUser = await this.usersService.create(
        preparedEmail,
        input.password,
      );

      const tokens = this.generateTokens({
        id: newUser.id,
        role: newUser.role,
      });

      return { user: newUser, ...tokens };
    } catch (error) {
      throw new BadRequestException(REGISTRATION_FAILED_ERROR + error);
    }
  }

  async login(input: AuthInput) {
    const user = await this.validateUser(input);

    const tokens = this.generateTokens({
      id: user.id,
      role: user.role,
    });

    return { user, ...tokens };
  }

  toggleRefreshTokenCookie(response: Response, token: string | null) {
    const expires = this.getRefreshTokenCookieExpires(token);

    response.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      expires,
      domain: this.configService.get<string>(COOKIE_DOMAIN_ENV),
      sameSite: isDev(this.configService) ? 'none' : 'strict',
    });
  }

  async getNewTokens(refreshToken: string) {
    const verifiedUser =
      await this.jwt.verifyAsync<Pick<AuthTokenData, 'id'>>(refreshToken);

    if (!verifiedUser) {
      throw new BadRequestException(INVALID_REFRESH_TOKEN_ERROR);
    }

    const user = await this.usersService.findById(verifiedUser.id);
    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);

    const tokens = this.generateTokens({
      id: user.id,
      role: user.role,
    });

    return { user, ...tokens };
  }

  private async validateUser(input: AuthInput) {
    const { email, password } = input;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(EMAIL_OR_PASSWORD_INVALID_ERROR);
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new NotFoundException(EMAIL_OR_PASSWORD_INVALID_ERROR);
    }

    return user;
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

  private getRefreshTokenCookieExpires(token: string | null): Date {
    const expires = new Date();

    if (!token) {
      expires.setTime(0);
    } else {
      const refreshTokenExpiresDays = Number(
        this.configService.getOrThrow<string>(
          JWT_REFRESH_TOKEN_EXPIRES_DAYS_ENV,
        ),
      );

      expires.setDate(expires.getDate() + refreshTokenExpiresDays);
    }

    return expires;
  }
}
