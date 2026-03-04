import Link from 'next/link'
import { Logout } from '@features/auth'
import { NavigationMenu } from './ui/navigation-menu'
import { ThemeToggle } from './ui/theme-toggle'
import { ROUTES } from '@shared/config'
import { Button } from '@shared/ui'
import { Bell, Headset } from 'lucide-react'
import { UserInfo } from './ui/user-info'

export function Header() {
  return (
    <header className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-8">
        <Link
          href={ROUTES.DASHBOARD}
          className="flex items-center justify-center text-xl font-black text-white bg-linear-to-b from-primary to-primary-dark rounded-full size-9"
        >
          F
        </Link>
        <NavigationMenu />
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />

        <Button variant="soft" className="size-9 rounded-full">
          <Headset className="size-5" />
        </Button>

        <Button variant="soft" className="size-9 rounded-full">
          <Bell className="size-5" />
        </Button>

        <div className="flex items-center gap-4">
          <UserInfo />
          <Logout />
        </div>
      </div>
    </header>
  )
}
