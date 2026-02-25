'use client'

import { useAuth } from '@features/auth'
// import Image from 'next/image'

export function UserInfo() {
  const { user } = useAuth()

  if (!user) return null

  const { email } = user

  return (
    <div className="flex items-center gap-3">
      {/* <Image
        src={avatarUrl}
        alt={`${name}'s Avatar`}
        width={36}
        height={36}
        className="rounded-full"
      /> */}

      <div>
        {/* <div className="font-medium">{name}</div> */}
        {email && <div className="opacity-60 text-xs">{email}</div>}
      </div>
    </div>
  )
}
