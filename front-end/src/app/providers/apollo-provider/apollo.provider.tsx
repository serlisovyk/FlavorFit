import { PropsWithChildren } from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { getApolloClient } from '@shared/lib/apollo/apollo.client'

const apolloClient = getApolloClient()

export function ApolloClientProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
