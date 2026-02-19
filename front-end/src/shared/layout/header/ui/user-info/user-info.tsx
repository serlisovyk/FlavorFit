import Image from 'next/image'
import { UserInfoProps } from '../../types'

export function UserInfo({ user }: UserInfoProps) {
  const { name, email, avatarUrl } = user
  return (
    <div className="flex items-center gap-3">
      <Image
        src={avatarUrl}
        alt={`${name}'s Avatar`}
        width={36}
        height={36}
        className="rounded-full"
      />

      <div>
        <div className="font-medium">{name}</div>
        <div className="opacity-60 text-xs">{email}</div>
      </div>
    </div>
  )
}
