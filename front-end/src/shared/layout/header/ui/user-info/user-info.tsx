'use client'

import Link from 'next/link'
import Image from 'next/image'
import { UserCircle } from 'lucide-react'
import { useAuth } from '@features/auth'
import { ROUTES } from '@shared/config'

export function UserInfo() {
  const { user } = useAuth()

  if (!user) return null

  const { email, avatarUrl, profile } = user

  return (
    <Link href={ROUTES.PROFILE} className="flex items-center gap-3">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={'User avatar'}
          width={36}
          height={36}
          className="rounded-full w-9 h-9 object-cover"
        />
      ) : (
        <UserCircle
          size={36}
          className="rounded-full text-gray-500 opacity-60"
        />
      )}

      <div>
        <div className="font-medium">{profile?.fullName || 'No name'}</div>
        {email && <div className="opacity-60 text-sm">{email}</div>}
      </div>
    </Link>
  )
}
