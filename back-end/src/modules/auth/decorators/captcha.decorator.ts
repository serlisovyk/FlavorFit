import { UseGuards } from '@nestjs/common'
import { CaptchaGuard } from '../guards/captcha.guard'

export const Captcha = () => UseGuards(CaptchaGuard)
