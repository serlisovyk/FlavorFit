import Link from 'next/link'
import { cn } from '@shared/utils'
import { NavigationMenuItemProps } from '../../types'

export function NavigationMenuItem({
  item,
  isActive,
}: NavigationMenuItemProps) {
  const { href, text, icon: Icon } = item
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium shadow transition-colors',
        isActive
          ? 'bg-[#1f2023] text-white'
          : 'bg-[#e9e9e9] text-[#696969] hover:bg-gray-200',
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span>{text}</span>
    </Link>
  )
}
