import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BadRequestException } from '@nestjs/common'
import type { GraphQLContext } from '../../shared/types'
import { AuthResponse } from './models/auth.response'
import { VerifyCaptcha } from './decorators/captcha.decorator'
import { AuthInput } from './inputs/auth.input'
import { AuthService } from './auth.service'
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MISSING_ERROR,
} from './auth.constants'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, {
    description: 'Login with email and password',
  })
  @VerifyCaptcha()
  async login(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.login(input)

    this.authService.toggleAccessTokenCookie(res, accessToken)
    this.authService.toggleRefreshTokenCookie(res, refreshToken)

    return response
  }

  @Mutation(() => AuthResponse, {
    description: 'Register a new user account',
  })
  @VerifyCaptcha()
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.register(input)

    this.authService.toggleAccessTokenCookie(res, accessToken)
    this.authService.toggleRefreshTokenCookie(res, refreshToken)

    return response
  }

  @Query(() => AuthResponse, {
    description: 'Refresh access token using refresh token',
  })
  async newTokens(@Context() { req, res }: GraphQLContext) {
    const initialRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME]

    if (!initialRefreshToken) {
      this.authService.toggleAccessTokenCookie(res, null)
      this.authService.toggleRefreshTokenCookie(res, null)

      throw new BadRequestException(REFRESH_TOKEN_MISSING_ERROR)
    }

    const { refreshToken, accessToken, ...response } =
      await this.authService.getNewTokens(initialRefreshToken)

    this.authService.toggleAccessTokenCookie(res, accessToken)
    this.authService.toggleRefreshTokenCookie(res, refreshToken)

    return response
  }

  @Mutation(() => Boolean, { description: 'Logout and clear refresh token' })
  logout(@Context() { req, res }: GraphQLContext) {
    const initialRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME]

    this.authService.toggleAccessTokenCookie(res, null)
    this.authService.toggleRefreshTokenCookie(res, null)

    if (!initialRefreshToken) {
      throw new BadRequestException(REFRESH_TOKEN_MISSING_ERROR)
    }

    return true
  }
}
