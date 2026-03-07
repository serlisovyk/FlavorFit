'use client'

import Image from 'next/image'
import { ChangeEvent } from 'react'
import { Edit, UserCircle } from 'lucide-react'
import { Button } from '@shared/ui'
import { cn } from '@shared/utils'
import { useAvatarUpload } from '../../queries'
import { AvatarUploadProps } from '../../types'

export function AvatarUpload({ value, onChange }: AvatarUploadProps) {
  const { isLoading, uploadAvatar } = useAvatarUpload(onChange)

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) uploadAvatar(file)
  }

  return (
    <div className="flex items-center gap-3">
      {!value ? (
        <UserCircle
          size={36}
          className="rounded-full text-gray-500 opacity-60"
        />
      ) : (
        <Image
          src={value}
          alt="User avatar"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
      )}

      <label>
        <span className="sr-only">Avatar upload input</span>

        <input
          hidden
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          disabled={isLoading}
        />

        <Button
          variant="soft"
          asChild
          disabled={isLoading}
          title="Add your avatar"
        >
          <span>
            <Edit className={cn(isLoading && 'animate-spin')} />
          </span>
        </Button>
      </label>
    </div>
  )
}
