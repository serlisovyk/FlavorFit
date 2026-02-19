import { LucideIcon } from 'lucide-react'

export interface NavigationMenuItem {
  icon: LucideIcon
  text: string
  href: string
}

export interface NavigationMenuItemProps {
  item: NavigationMenuItem
  isActive: boolean
}

export interface UserInfoProps {
  user: User
}

export interface User {
  name: string
  email: string
  avatarUrl: string
}
