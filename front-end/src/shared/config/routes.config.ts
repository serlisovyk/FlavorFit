export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
}

export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES]
