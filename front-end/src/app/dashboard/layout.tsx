import { PropsWithChildren } from 'react'
import { Header } from '@shared/layout'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="py-5 px-6">
      <Header />
      <div>{children}</div>
    </div>
  )
}
