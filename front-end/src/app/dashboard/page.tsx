import { Metadata } from 'next'
import { NO_INDEX_PAGE_METADATA } from '@shared/constants'

export const metadata: Metadata = {
  title: 'Dashboard',
  ...NO_INDEX_PAGE_METADATA,
}

export default function DashboardPage() {
  return <div>DashboardPage</div>
}
