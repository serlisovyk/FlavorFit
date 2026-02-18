'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { navigationMenuData } from '../../data'
import { NavigationMenuItem } from '../navigation-menu-item'

export function NavigationMenu() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-2">
      {navigationMenuData.map((item) => (
        <NavigationMenuItem
          key={item.href}
          item={item}
          isActive={!!match(item.href)(pathname)}
        />
      ))}
    </nav>
  )
}
