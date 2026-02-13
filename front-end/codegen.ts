import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  // TODO: Update on config constant if can
  schema: 'http://localhost:4200/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    "generated/": {
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
