import { NEXT_PUBLIC_SERVER_URL_ENV } from '@shared/env'
import { UploadResponse } from '../types'

export async function postAvatarUpload(formData: FormData) {
  const response = await fetch(`${NEXT_PUBLIC_SERVER_URL_ENV}/upload/avatar`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  if (!response.ok) throw new Error('Failed to upload avatar')

  const data: UploadResponse = await response.json()

  return data
}
