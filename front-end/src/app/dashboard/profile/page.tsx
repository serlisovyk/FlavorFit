import { Metadata } from 'next'
import { Profile } from '@features/profile'
import { NO_INDEX_PAGE_METADATA } from '@shared/constants'

export const metadata: Metadata = {
  title: 'Profile',
  ...NO_INDEX_PAGE_METADATA,
}

export default function ProfilePage() {
  return <Profile />
}
