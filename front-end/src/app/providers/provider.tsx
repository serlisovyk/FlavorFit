'use client'

import { PropsWithChildren } from 'react'
import { ApolloClientProvider } from './apollo-provider'

export function Provider({ children }: PropsWithChildren) {
  return <ApolloClientProvider>{children}</ApolloClientProvider>
}
