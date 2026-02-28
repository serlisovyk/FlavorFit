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
import { generateToken, isDev } from '@/shared/utils'
import { ONE_HOUR_IN_MS, ONE_DAY_IN_MS } from '@/shared/constants'
import { EmailService } from '@/common/email/email.service'
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
  CLIENT_URL_ENV,
} from './auth.constants'
import { AuthTokenData } from './auth.interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  async register(input: AuthInput) {
    try {
      const preparedEmail = input.email.toLowerCase()

      const emailVerificationToken = generateToken()

      const newUser = await this.usersService.create({
        email: preparedEmail,
        password: input.password,
        emailVerificationToken,
      })

      const tokens = this.generateTokens({
        id: newUser.id,
        role: newUser.role,
      })

      const verificationUrl = `${this.configService.get<string>(
        CLIENT_URL_ENV,
      )}/verify-email?token=${emailVerificationToken}`

      await this.emailService.sendVerificationEmail(
        newUser.email,
        verificationUrl,
      )

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

  setAuthCookies(
    response: Response,
    accessToken: string | null,
    refreshToken: string | null,
  ) {
    const accessTokenExpiresHours = this.configService.getOrThrow<number>(
      JWT_ACCESS_TOKEN_EXPIRES_HOURS_ENV,
    )

    const accessTokenExpires = new Date(
      Date.now() + accessTokenExpiresHours * ONE_HOUR_IN_MS,
    )

    const refreshTokenExpiresDays = this.configService.getOrThrow<number>(
      JWT_REFRESH_TOKEN_EXPIRES_DAYS_ENV,
    )

    const refreshTokenExpires = new Date(
      Date.now() + refreshTokenExpiresDays * ONE_DAY_IN_MS,
    )

    const defaultCookieOptions = {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>(COOKIE_DOMAIN_ENV),
      sameSite: isDev(this.configService) ? 'none' : 'strict',
    } as const

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      ...defaultCookieOptions,
      expires: accessToken ? accessTokenExpires : new Date(0),
    })

    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      ...defaultCookieOptions,
      expires: refreshToken ? refreshTokenExpires : new Date(0),
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
