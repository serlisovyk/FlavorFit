import { useQuery } from '@apollo/client/react'
import { MeDocument } from '@generated/graphql'

export function useAuth() {
  const { data, loading } = useQuery(MeDocument, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  })

  return {
    user: data?.me,
    isLoading: loading,
    isLoggedIn: !!data?.me,
  }
}
