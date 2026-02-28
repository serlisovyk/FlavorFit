import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EmailService } from '@/common/email/email.service'
import { generateToken } from '@/shared/utils'
import { UsersService } from '../../users/users.service'
import {
  CLIENT_URL_ENV,
  INVALID_OR_EXPIRED_EMAIL_TOKEN_ERROR,
  INVALID_OR_EXPIRED_PASSWORD_RESET_TOKEN_ERROR,
} from '../auth.constants'

@Injectable()
export class AuthAccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  async verifyEmail(token: string) {
    const user = await this.usersService.findByEmailVerificationToken(token)

    if (!user) {
      throw new BadRequestException(INVALID_OR_EXPIRED_EMAIL_TOKEN_ERROR)
    }

    await this.usersService.markEmailAsVerified(user.id)

    return true
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email.toLowerCase())

    if (!user) return true

    const resetToken = generateToken()

    await this.usersService.setPasswordResetToken(user.id, resetToken)

    const resetUrl = `${this.configService.getOrThrow<string>(
      CLIENT_URL_ENV,
    )}/reset-password?token=${resetToken}`

    await this.emailService.sendResetPasswordEmail(user.email, resetUrl)

    return true
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByPasswordResetToken(token)

    if (!user) {
      throw new BadRequestException(
        INVALID_OR_EXPIRED_PASSWORD_RESET_TOKEN_ERROR,
      )
    }

    await this.usersService.updatePassword(user.id, newPassword)

    return true
  }
}
