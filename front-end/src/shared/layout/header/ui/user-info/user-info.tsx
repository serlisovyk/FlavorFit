'use client'

import Link from 'next/link'
import Image from 'next/image'
import { UserCircle } from 'lucide-react'
import { useAuth } from '@features/auth'
import { ROUTES } from '@shared/config'

export function UserInfo() {
  const { user } = useAuth()

  if (!user) return null

  const { email } = user

  const avatarUrl = null
  const name = 'Test User'

  return (
    <Link href={ROUTES.PROFILE} className="flex items-center gap-3">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={'User avatar'}
          width={36}
          height={36}
          className="rounded-full"
        />
      ) : (
        <UserCircle
          size={36}
          className="rounded-full text-gray-500 opacity-60"
        />
      )}

      <div>
        <div className="font-medium">{name}</div>
        {email && <div className="opacity-60 text-xs">{email}</div>}
      </div>
    </Link>
  )
}
