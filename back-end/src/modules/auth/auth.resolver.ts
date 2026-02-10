import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import type { GraphQLContext } from '../../shared/types';
import { AuthResponse } from './models/auth.response';
import { AuthInput } from './inputs/auth.input';
import { AuthService } from './auth.service';
import {
  LOGIN_MUTATION_DESCRIPTION,
  LOGOUT_MUTATION_DESCRIPTION,
  NEW_TOKENS_QUERY_DESCRIPTION,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MISSING_ERROR,
  REGISTER_MUTATION_DESCRIPTION,
} from './auth.constants';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { description: LOGIN_MUTATION_DESCRIPTION })
  async login(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, ...response } = await this.authService.login(input);

    this.authService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Mutation(() => AuthResponse, { description: REGISTER_MUTATION_DESCRIPTION })
  async register(
    @Args('data') input: AuthInput,
    @Context() { res }: GraphQLContext,
  ) {
    const { refreshToken, ...response } =
      await this.authService.register(input);

    this.authService.toggleRefreshTokenCookie(res, refreshToken);

    return response;
  }

  @Query(() => AuthResponse, { description: NEW_TOKENS_QUERY_DESCRIPTION })
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

  @Mutation(() => Boolean, { description: LOGOUT_MUTATION_DESCRIPTION })
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
