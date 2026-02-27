import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '../users/users.service'
import { EmailService } from '@/email/email.service'
import { generateToken } from '@/shared/utils'
import { CLIENT_URL_ENV } from './auth.constants'

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
      throw new BadRequestException(
        'Invalid or expired email verification token',
      )
    }

    await this.usersService.markEmailAsVerified(user.id)

    return true
  }

  async requestPasswordReset(email: string) {
    const preparedEmail = email.toLowerCase()

    const user = await this.usersService.findByEmail(preparedEmail)

    if (!user) return true

    const resetToken = generateToken()

    await this.usersService.setPasswordResetToken(user.id, resetToken)

    const resetUrl = `${this.configService.get<string>(
      CLIENT_URL_ENV,
    )}/reset-password?token=${resetToken}`

    await this.emailService.sendResetPasswordEmail(user.email, resetUrl)

    return true
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByPasswordResetToken(token)

    if (!user) {
      throw new BadRequestException('Invalid or expired password reset token')
    }

    await this.usersService.updatePassword(user.id, newPassword)

    return true
  }
}
