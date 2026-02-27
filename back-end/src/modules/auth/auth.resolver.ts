import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BadRequestException } from '@nestjs/common'
import type { GraphQLContext } from '../../shared/types'
import { AuthResponse } from './models/auth.response'
import { VerifyCaptcha } from './decorators/captcha.decorator'
import {
  AuthInput,
  RequestPasswordResetInput,
  ResetPasswordInput,
} from './inputs/auth.input'
import { AuthAccountService } from './auth-account.service'
import { AuthService } from './auth.service'
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MISSING_ERROR,
} from './auth.constants'

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly authAccountService: AuthAccountService,
  ) {}

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

  @Mutation(() => Boolean, {
    description: 'Verify email using token from verification email',
  })
  async verifyEmail(@Args('token', { type: () => String }) token: string) {
    return this.authAccountService.verifyEmail(token)
  }

  @Mutation(() => Boolean)
  @VerifyCaptcha()
  async requestPasswordReset(@Args('data') input: RequestPasswordResetInput) {
    return this.authAccountService.requestPasswordReset(input.email)
  }

  @Mutation(() => Boolean)
  @VerifyCaptcha()
  async resetPassword(@Args('data') input: ResetPasswordInput) {
    return this.authAccountService.resetPassword(input.token, input.newPassword)
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
