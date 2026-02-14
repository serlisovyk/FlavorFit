'use client'

import { createContext, useState, useEffect } from 'react'
import { IS_CLIENT } from '@shared/constants'
import { THEME_COOKIE_MAX_AGE, THEME_COOKIE_NAME } from '../constants'
import { Theme, ThemeContextValue, ThemeProviderProps, THEMES } from '../types'

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
)

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => {
    if (!IS_CLIENT) return

    document.documentElement.classList.toggle(
      THEMES.DARK,
      theme === THEMES.DARK,
    )
  }, [theme])

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)

    if (!IS_CLIENT) return

    document.cookie = `${THEME_COOKIE_NAME}=${nextTheme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}`
  }

  const toggleTheme = () => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT)
  }

  const value: ThemeContextValue = { theme, setTheme, toggleTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
