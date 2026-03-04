import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import * as iconv from 'iconv-lite'
import { UPLOADS_FOLDER, AVATARS_FOLDER } from './upload.constants'
import { UploadResponse } from './upload.types'

@Injectable()
export class UploadService {
  async saveAvatar(file: Express.Multer.File): Promise<UploadResponse> {
    const uploadFolder = `${path}/${UPLOADS_FOLDER}/${AVATARS_FOLDER}`

    await ensureDir(uploadFolder)

    const original = iconv.decode(
      Buffer.from(file.originalname, 'binary'),
      'utf-8',
    )

    const safeName = original.replace(/[^\w.-]+/g, '-').toLowerCase()
    const name = `${uuidv4().slice(0, 5)}-${safeName}`

    await writeFile(`${uploadFolder}/${name}`, file.buffer)

    const url = `/${UPLOADS_FOLDER}/${AVATARS_FOLDER}/${name}`

    return { url, name }
  }
}
