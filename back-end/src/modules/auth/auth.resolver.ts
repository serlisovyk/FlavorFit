import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import type { GraphQLContext } from '../../shared/types';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.interfaces';
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MISSING_ERROR,
} from './auth.constants';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // TODO: Add captcha
  @Mutation(() => AuthResponse)
  async login(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, ...response } = await this.authService.login(input);

    this.authService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  // TODO: Add captcha
  @Mutation(() => AuthResponse)
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, ...response } =
      await this.authService.register(input);

    this.authService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Query(() => AuthResponse)
  async newTokens(@Context() { req, res }: GraphQLContext) {
    const initialRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

    if (!initialRefreshToken) {
      this.authService.toggleRefreshTokenCookie(res, null);
      throw new BadRequestException(REFRESH_TOKEN_MISSING_ERROR);
    }

    const { refreshToken: newRefreshToken, ...response } =
      await this.authService.getNewTokens(initialRefreshToken);

    this.authService.toggleRefreshTokenCookie(res, newRefreshToken);

    return response;
  }

  @Mutation(() => Boolean)
  logout(@Context() { req, res }: GraphQLContext) {
    const initialRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

    if (!initialRefreshToken) {
      this.authService.toggleRefreshTokenCookie(res, null);
      throw new BadRequestException(REFRESH_TOKEN_MISSING_ERROR);
    }

    this.authService.toggleRefreshTokenCookie(res, null);

    return true;
  }
}
