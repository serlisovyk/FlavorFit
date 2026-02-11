import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: ['./schema.json', 'http://localhost:4200/graphql'],
  documents: 'src/shared/graphql/**/*.graphql',
  extensions: {
    codegen: './codegen.ts',
  },
}

export default config
