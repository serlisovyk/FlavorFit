import { PropsWithChildren } from 'react'
import { Header } from '@shared/layout'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  )
}
