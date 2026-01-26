import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './auth.input';
import { AuthResponse } from './auth.interfaces';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // TODO: Add captcha
  @Mutation(() => AuthResponse)
  async register(@Args('data') input: AuthInput) {
    // TODO: Add cookie
    return this.authService.register(input);
  }
}
