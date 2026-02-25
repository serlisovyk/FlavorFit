'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@shared/ui'
import { useLogoutMutation } from '../../queries'

export function Logout() {
  const { handleLogout, isLoading } = useLogoutMutation()

  return (
    <Button
      variant="soft"
      className="size-9 rounded-full"
      onClick={handleLogout}
      disabled={isLoading}
    >
      <LogOut className="size-5" />
    </Button>
  )
}
