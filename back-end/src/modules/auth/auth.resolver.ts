import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BadRequestException } from '@nestjs/common'
import type { GraphQLContext } from '@/shared/types'
import { AuthResponse } from './models/auth.response'
import { Captcha } from './decorators/captcha.decorator'
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
  @Captcha()
  async login(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.login(input)

    this.authService.setAuthCookies(res, accessToken, refreshToken)

    return response
  }

  @Mutation(() => AuthResponse, {
    description: 'Register a new user account',
  })
  @Captcha()
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.register(input)

    this.authService.setAuthCookies(res, accessToken, refreshToken)

    return response
  }

  @Query(() => AuthResponse, {
    description: 'Refresh access token using refresh token',
  })
  async newTokens(@Context() { req, res }: GraphQLContext) {
    const initialRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME]

    if (!initialRefreshToken) {
      this.authService.setAuthCookies(res, null, null)

      throw new BadRequestException(REFRESH_TOKEN_MISSING_ERROR)
    }

    const { refreshToken, accessToken, ...response } =
      await this.authService.getNewTokens(initialRefreshToken)

    this.authService.setAuthCookies(res, accessToken, refreshToken)

    return response
  }

  @Mutation(() => Boolean, { description: 'Logout and clear refresh token' })
  logout(@Context() { req, res }: GraphQLContext) {
    const initialRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME]

    this.authService.setAuthCookies(res, null, null)

    if (!initialRefreshToken) {
      throw new BadRequestException(REFRESH_TOKEN_MISSING_ERROR)
    }

    return true
  }
}
