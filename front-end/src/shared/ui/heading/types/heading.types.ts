import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

export interface HeadingProps {
  children: ReactNode
  level?: HeadingLevel
  Icon?: LucideIcon
  className?: string
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
