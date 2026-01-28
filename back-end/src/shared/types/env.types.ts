export const MODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export type Mode = (typeof MODE)[keyof typeof MODE];
