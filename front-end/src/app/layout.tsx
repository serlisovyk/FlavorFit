import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import { getCurrentTheme } from '@shared/theme/server-index'
import { Providers } from './providers'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Flavor Fit',
  description:
    'A fitness app that helps you track your progress and achieve your goals.',
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const theme = await getCurrentTheme()

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialTheme={theme}>{children}</Providers>
      </body>
    </html>
  )
}
