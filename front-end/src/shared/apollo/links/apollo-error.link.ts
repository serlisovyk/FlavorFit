import { Observable, CombinedGraphQLErrors } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { GetNewTokensDocument } from '@generated/graphql'
import { simpleApolloClient } from '../config'

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!CombinedGraphQLErrors.is(error)) return

  for (const gqlError of error.errors) {
    if (gqlError.extensions?.code === 'UNAUTHENTICATED') {
      return new Observable((observer) => {
        simpleApolloClient
          .query({
            query: GetNewTokensDocument,
            fetchPolicy: 'no-cache',
          })
          .then(() => forward(operation).subscribe(observer))
          .catch((error) => observer.error(error))
      })
    }
  }

  return
})
