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
        'flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-medium shadow transition-colors',
        isActive
          ? 'bg-gray-800 text-white'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span>{text}</span>
    </Link>
  )
}
