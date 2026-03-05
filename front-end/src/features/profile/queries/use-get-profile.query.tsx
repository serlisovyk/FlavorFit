import { useQuery } from '@apollo/client/react'
import { GetProfileDocument } from '@generated/graphql'

export function useGetProfile() {
  const { data, loading } = useQuery(GetProfileDocument)

  return { data, isLoading: loading }
}
