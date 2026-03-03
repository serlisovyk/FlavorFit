import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { NODE_ENV } from '@shared/env'
import { IS_CLIENT, NODE } from '@shared/constants'
import { errorLink, httpLink } from '../links'

export function getApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    devtools: { enabled: NODE_ENV === NODE.DEVELOPMENT },
    link: IS_CLIENT ? ApolloLink.from([errorLink, httpLink]) : httpLink,
    ssrMode: !IS_CLIENT,
    defaultOptions: {
      query: { fetchPolicy: IS_CLIENT ? 'cache-first' : 'no-cache' },
    },
  })
}
