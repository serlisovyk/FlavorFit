import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { NODE_ENV } from '@shared/config'
import { IS_CLIENT, NODE } from '@shared/constants'
import { httpLink } from './links/apollo-http.link'

export const simpleApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  devtools: { enabled: NODE_ENV === NODE.DEVELOPMENT },
})

const clientApolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  devtools: { enabled: NODE_ENV === NODE.DEVELOPMENT },
})

const serverApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  devtools: { enabled: NODE_ENV === NODE.DEVELOPMENT },
  ssrMode: true,
  defaultOptions: { query: { fetchPolicy: 'no-cache' } },
})

export function getApolloClient() {
  return IS_CLIENT ? clientApolloClient : serverApolloClient
}
