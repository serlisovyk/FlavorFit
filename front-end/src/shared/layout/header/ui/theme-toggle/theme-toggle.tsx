'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@shared/theme'
import { Button } from '@shared/ui'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="soft"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="size-9 rounded-full"
    >
      {theme === 'dark' ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  )
}
