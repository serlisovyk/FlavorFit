import { NextRequest } from 'next/server'
import { GRAPHQL_SERVER_URL } from '@shared/config'

export function fetchRefreshToken(request: NextRequest) {
  return fetch(GRAPHQL_SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: request.headers.get('cookie') || '',
    },
    body: JSON.stringify({
      query: `
      query {
        newTokens {
          user { id }
        }
      }
      `,
    }),
  })
}
