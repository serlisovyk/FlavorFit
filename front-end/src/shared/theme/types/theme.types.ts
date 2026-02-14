import { ReactNode } from 'react'

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}

export type Theme = (typeof THEMES)[keyof typeof THEMES]

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export interface ThemeProviderProps {
  initialTheme: Theme
  children: ReactNode
}
