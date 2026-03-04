import { useState } from 'react'
import toast from 'react-hot-toast'
import { postAvatarUpload } from '../services'
import { UploadAvatarOnChangeFn } from '../types'

export function useAvatarUpload(onChange: UploadAvatarOnChangeFn) {
  const [isLoading, setIsLoading] = useState(false)

  async function uploadAvatar(file: File) {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const { url } = await postAvatarUpload(formData)
      onChange(url)

      toast.success('Avatar uploaded successfully')
    } catch (error) {
      console.error('Avatar upload failed:', error)
      toast.error('Failed to upload avatar')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, uploadAvatar }
}
