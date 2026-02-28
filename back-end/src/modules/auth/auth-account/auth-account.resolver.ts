import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Captcha } from '../decorators/captcha.decorator'
import { RequestPasswordResetInput } from '../inputs/request-password-reset.input'
import { ResetPasswordInput } from '../inputs/reset-password.input'
import { AuthAccountService } from './auth-account.service'

@Resolver()
export class AuthAccountResolver {
  constructor(private readonly authAccountService: AuthAccountService) {}

  @Mutation(() => Boolean, {
    description: 'Verify email using token from verification email',
  })
  async verifyEmail(@Args('token', { type: () => String }) token: string) {
    return this.authAccountService.verifyEmail(token)
  }

  @Mutation(() => Boolean, {
    description: 'Request password reset email',
  })
  @Captcha()
  async requestPasswordReset(@Args('data') input: RequestPasswordResetInput) {
    return this.authAccountService.requestPasswordReset(input.email)
  }

  @Mutation(() => Boolean, {
    description: 'Reset password using token from password reset email',
  })
  @Captcha()
  async resetPassword(@Args('data') input: ResetPasswordInput) {
    return this.authAccountService.resetPassword(input.token, input.newPassword)
  }
}
