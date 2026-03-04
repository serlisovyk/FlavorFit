import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from '../auth/decorators/auth.decorator'
import { UploadService } from './upload.service'
import { MAX_FILE_SIZE } from './upload.constants'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @HttpCode(200)
  @Post('avatar')
  @Auth()
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE } }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    const uploaded = await this.uploadService.saveAvatar(file)
    return uploaded
  }
}
