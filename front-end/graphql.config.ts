import 'dotenv/config'
import type { IGraphQLConfig } from 'graphql-config'
import { GRAPHQL_SERVER_URL } from './src/shared/config'

const config: IGraphQLConfig = {
  schema: ['./schema.json', GRAPHQL_SERVER_URL],
  documents: 'src/shared/graphql/**/*.graphql',
  extensions: {
    codegen: './codegen.ts',
  },
}

export default config
