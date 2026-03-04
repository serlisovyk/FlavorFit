import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { UPLOADS_FOLDER } from './upload.constants'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/${UPLOADS_FOLDER}`,
      serveRoot: `/${UPLOADS_FOLDER}`,
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
