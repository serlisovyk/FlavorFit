import { NEXT_PUBLIC_SERVER_URL_ENV } from '../env'

export const GRAPHQL_SERVER_URL = `${NEXT_PUBLIC_SERVER_URL_ENV}/graphql`

export const TURNSTILE_TOKEN_HEADER = 'cf-turnstile-token'
