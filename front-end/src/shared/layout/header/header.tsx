import { NavigationMenu } from './ui/navigation-menu'
import { ThemeToggle } from './ui/theme-toggle'

export function Header() {
  return (
    <header className="p-5">
      <NavigationMenu />
      <ThemeToggle />
    </header>
  )
}
