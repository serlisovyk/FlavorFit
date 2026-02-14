import { PropsWithChildren } from 'react'
import { Theme } from '@shared/theme'

export interface ProvidersProps extends PropsWithChildren {
  initialTheme: Theme
}
