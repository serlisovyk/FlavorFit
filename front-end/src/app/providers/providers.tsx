'use client'

import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@shared/theme'
import { ApolloClientProvider } from '@shared/apollo'
import { ProvidersProps } from './types'

export function Providers({ children, initialTheme }: ProvidersProps) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <ApolloClientProvider>
        {children}
        <Toaster position="top-center" />
      </ApolloClientProvider>
    </ThemeProvider>
  )
}
