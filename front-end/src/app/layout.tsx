import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import { cn } from '@shared/utils'
import { getCurrentTheme } from '@shared/theme/server-index'
import { SITE_NAME } from '@shared/constants'
import { Providers } from './providers'
import './globals.css'

const monoFont = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'A fitness app that helps you track your progress and achieve your goals.',
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const theme = await getCurrentTheme()

  return (
    <html
      lang="en"
      className={cn(theme, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body className={`${monoFont.variable} antialiased`}>
        <Providers initialTheme={theme}>{children}</Providers>
      </body>
    </html>
  )
}
