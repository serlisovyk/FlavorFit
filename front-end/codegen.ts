import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  // TODO: Update on config constant if can
  schema: 'http://localhost:4200/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'generated/output.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: { enumsAsConst: true },
    },
    'schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
