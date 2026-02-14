import { ApolloClient } from '@apollo/client'
import { httpLink } from '../links'
import { InMemoryCache } from '@apollo/client'
import { NODE_ENV } from '@shared/config'
import { NODE } from '@shared/constants'

export const simpleApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  devtools: { enabled: NODE_ENV === NODE.DEVELOPMENT },
})
