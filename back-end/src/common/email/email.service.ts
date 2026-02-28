import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ResendService } from 'nestjs-resend'
import { render } from '@react-email/render'
import { APP_NAME_ENV } from '@/shared/constants'
import { VerificationEmail } from './templates/verification-email.template'
import { ResetPasswordEmail } from './templates/reset-password.template'

@Injectable()
export class EmailService {
  constructor(
    private readonly resend: ResendService,
    private readonly configService: ConfigService,
  ) {}

  async sendVerificationEmail(to: string, url: string) {
    const html = await render(
      VerificationEmail({
        url,
        appName: this.getAppName(),
      }),
    )

    return this.send(to, 'Verify your email', html)
  }

  async sendResetPasswordEmail(to: string, url: string) {
    const html = await render(
      ResetPasswordEmail({
        url,
        appName: this.getAppName(),
      }),
    )

    return this.send(to, 'Reset your password', html)
  }

  private async send(to: string, subject: string, html: string) {
    return this.resend.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html,
    })
  }

  private getAppName() {
    return this.configService.getOrThrow<string>(APP_NAME_ENV)
  }
}
