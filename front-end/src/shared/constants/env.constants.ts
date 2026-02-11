export const NODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
}

export type NODE = (typeof NODE)[keyof typeof NODE]
