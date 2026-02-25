import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { StringValue } from 'ms'
import { verify } from 'argon2'
import { Response } from 'express'
import { isDev } from '../../shared/utils'
import { UsersService } from '../users/users.service'
import { AuthInput } from './inputs/auth.input'
import {
  JWT_ACCESS_TOKEN_EXPIRES_IN_ENV,
  JWT_REFRESH_TOKEN_EXPIRES_IN_ENV,
  COOKIE_DOMAIN_ENV,
  REGISTRATION_FAILED_ERROR,
  EMAIL_OR_PASSWORD_INVALID_ERROR,
  INVALID_REFRESH_TOKEN_ERROR,
  USER_NOT_FOUND_ERROR,
  ACCESS_TOKEN_COOKIE_NAME,
  JWT_ACCESS_TOKEN_EXPIRES_HOURS_ENV,
  REFRESH_TOKEN_COOKIE_NAME,
  JWT_REFRESH_TOKEN_EXPIRES_DAYS_ENV,
} from './auth.constants'
import { AuthTokenData, ToggleAuthTokenCookieParams } from './auth.interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(input: AuthInput) {
    try {
      const preparedEmail = input.email.toLowerCase()

      const newUser = await this.usersService.create(
        preparedEmail,
        input.password,
      )

      const tokens = this.generateTokens({
        id: newUser.id,
        role: newUser.role,
      })

      return { user: newUser, ...tokens }
    } catch (error) {
      throw new BadRequestException(REGISTRATION_FAILED_ERROR + error)
    }
  }

  async login(input: AuthInput) {
    const user = await this.validateUser(input)

    const tokens = this.generateTokens({
      id: user.id,
      role: user.role,
    })

    return { user, ...tokens }
  }

  toggleAccessTokenCookie(response: Response, token: string | null) {
    const expires = new Date(
      Date.now() +
        this.configService.getOrThrow<number>(
          JWT_ACCESS_TOKEN_EXPIRES_HOURS_ENV,
        ) *
          3600000,
    )

    this.toggleAuthTokenCookie({
      response,
      token,
      name: ACCESS_TOKEN_COOKIE_NAME,
      expires,
    })
  }

  toggleRefreshTokenCookie(response: Response, token: string | null) {
    const expires = new Date(
      Date.now() +
        this.configService.getOrThrow<number>(
          JWT_REFRESH_TOKEN_EXPIRES_DAYS_ENV,
        ) *
          24 *
          60 *
          60 *
          1000,
    )

    this.toggleAuthTokenCookie({
      response,
      token,
      name: REFRESH_TOKEN_COOKIE_NAME,
      expires,
    })
  }

  private toggleAuthTokenCookie({
    response,
    token,
    name,
    expires,
  }: ToggleAuthTokenCookieParams) {
    const expiresIn = !token ? new Date(0) : expires

    response.cookie(name, token, {
      httpOnly: true,
      secure: true,
      expires: expiresIn,
      domain: this.configService.get<string>(COOKIE_DOMAIN_ENV),
      sameSite: isDev(this.configService) ? 'none' : 'strict',
    })
  }

  async getNewTokens(refreshToken: string) {
    const verifiedUser =
      await this.jwt.verifyAsync<Pick<AuthTokenData, 'id'>>(refreshToken)

    if (!verifiedUser) {
      throw new BadRequestException(INVALID_REFRESH_TOKEN_ERROR)
    }

    const user = await this.usersService.findById(verifiedUser.id)
    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR)

    const tokens = this.generateTokens({
      id: user.id,
      role: user.role,
    })

    return { user, ...tokens }
  }

  private async validateUser(input: AuthInput) {
    const { email, password } = input

    const user = await this.usersService.findByEmail(email)

    if (!user) throw new NotFoundException(EMAIL_OR_PASSWORD_INVALID_ERROR)

    const isPasswordValid = await verify(user.password, password)

    if (!isPasswordValid) {
      throw new NotFoundException(EMAIL_OR_PASSWORD_INVALID_ERROR)
    }

    return user
  }

  private generateTokens(data: AuthTokenData) {
    const accessToken = this.jwt.sign(data, {
      expiresIn: this.configService.get<StringValue>(
        JWT_ACCESS_TOKEN_EXPIRES_IN_ENV,
      ),
    })

    const refreshToken = this.jwt.sign(
      { id: data.id },
      {
        expiresIn: this.configService.get<StringValue>(
          JWT_REFRESH_TOKEN_EXPIRES_IN_ENV,
        ),
      },
    )

    return { accessToken, refreshToken }
  }
}
