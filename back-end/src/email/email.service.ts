import { Injectable } from '@nestjs/common'
import { render } from '@react-email/render'
import { ResendService } from 'nestjs-resend'
import { VerificationEmail } from './templates/verification-email.template'
import { ResetPasswordEmail } from './templates/reset-password.template'

@Injectable()
export class EmailService {
  constructor(private readonly resend: ResendService) {}

  private async send(to: string, subject: string, html: string) {
    return this.resend.send({
      from: 'FlavorFit <no-reply@flavorfit.com>',
      to,
      subject,
      html,
    })
  }

  async sendVerificationEmail(to: string, url: string) {
    const html = await render(VerificationEmail({ url, appName: 'FlavorFit' }))
    return this.send(to, 'Verify your email', html)
  }

  async sendResetPasswordEmail(to: string, url: string) {
    const html = await render(ResetPasswordEmail({ url, appName: 'FlavorFit' }))
    return this.send(to, 'Reset your password', html)
  }
}
