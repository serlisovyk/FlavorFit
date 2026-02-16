import { ReactNode } from 'react'

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

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
