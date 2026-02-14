import 'dotenv/config'
import type { CodegenConfig } from '@graphql-codegen/cli'
import { GRAPHQL_SERVER_URL } from './src/shared/config'

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: GRAPHQL_SERVER_URL,
  documents: 'src/**/*.graphql',
  generates: {
    'generated/': {
      preset: 'client',
      presetConfig: { fragmentMasking: false },
      config: { enumsAsConst: true },
    },
    'schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
