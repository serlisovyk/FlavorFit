'use client'

import { ProfileSkeleton } from '../profile-skeleton'
import { ProfileForm } from '../profile-form'
import { useGetProfile } from '../../queries'

export function Profile() {
  const { data, isLoading } = useGetProfile()

  if (isLoading || !data?.me) return <ProfileSkeleton />

  return <ProfileForm data={data} />
}
