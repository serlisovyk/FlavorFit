export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken' as const
export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken' as const

export const JWT_ACCESS_TOKEN_EXPIRES_IN_ENV = 'JWT_ACCESS_TOKEN_EXPIRES_IN'
export const JWT_REFRESH_TOKEN_EXPIRES_IN_ENV = 'JWT_REFRESH_TOKEN_EXPIRES_IN'
export const JWT_ACCESS_TOKEN_EXPIRES_HOURS_ENV =
  'JWT_ACCESS_TOKEN_EXPIRES_HOURS'
export const JWT_REFRESH_TOKEN_EXPIRES_DAYS_ENV =
  'JWT_REFRESH_TOKEN_EXPIRES_DAYS'

export const COOKIE_DOMAIN_ENV = 'COOKIE_DOMAIN'
export const CLIENT_URL_ENV = 'CLIENT_URL'

export const REGISTRATION_FAILED_ERROR = 'Registration failed: '
export const EMAIL_OR_PASSWORD_INVALID_ERROR = 'Invalid email or password'
export const INVALID_REFRESH_TOKEN_ERROR = 'Invalid refresh token'
export const USER_NOT_FOUND_ERROR = 'User not found'
export const REFRESH_TOKEN_MISSING_ERROR = 'Refresh token is missing'
export const FORBIDDEN_ERROR =
  'You do not have permission to access this resource.'
export const CAPTCHA_TOKEN_IS_REQUIRED_ERROR = 'Captcha token is required'
export const INVALID_CAPTCHA_TOKEN_ERROR = 'Invalid captcha token'
export const INVALID_OR_EXPIRED_EMAIL_TOKEN_ERROR =
  'Invalid or expired email verification token'
export const INVALID_OR_EXPIRED_PASSWORD_RESET_TOKEN_ERROR =
  'Invalid or expired password reset token'
