import { PropsWithChildren } from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { getApolloClient } from '@shared/apollo'

const apolloClient = getApolloClient()

export function ApolloClientProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
