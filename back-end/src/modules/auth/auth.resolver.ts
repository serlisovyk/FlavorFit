import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import type { GraphQLContext } from '../../shared/types';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.interfaces';

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
}
