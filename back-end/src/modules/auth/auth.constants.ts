export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

export const JWT_ACCESS_TOKEN_EXPIRES_IN_ENV = 'JWT_ACCESS_TOKEN_EXPIRES_IN';
export const JWT_REFRESH_TOKEN_EXPIRES_IN_ENV = 'JWT_REFRESH_TOKEN_EXPIRES_IN';
export const JWT_REFRESH_TOKEN_EXPIRES_DAYS_ENV =
  'JWT_REFRESH_TOKEN_EXPIRES_DAYS';
export const COOKIE_DOMAIN_ENV = 'COOKIE_DOMAIN';

export const REGISTRATION_FAILED_ERROR = 'Registration failed: ';
export const EMAIL_OR_PASSWORD_INVALID_ERROR = 'Invalid email or password';
export const INVALID_REFRESH_TOKEN_ERROR = 'Invalid refresh token';
export const USER_NOT_FOUND_ERROR = 'User not found';
export const REFRESH_TOKEN_MISSING_ERROR = 'Refresh token is missing';
export const FORBIDDEN_ERROR =
  'You do not have permission to access this resource.';

export const AUTH_EMAIL_IS_EMAIL_ERROR = 'Email must be a valid address';
export const AUTH_EMAIL_NOT_EMPTY_ERROR = 'Email cannot be empty';
export const AUTH_PASSWORD_NOT_EMPTY_ERROR = 'Password cannot be empty';
export const AUTH_PASSWORD_MIN_LENGTH_ERROR =
  'Password must contain at least 6 characters';
export const AUTH_PASSWORD_MAX_LENGTH_ERROR =
  'Password must contain at most 50 characters';

export const AUTH_INPUT_DESCRIPTION = 'Login or registration credentials';
export const AUTH_EMAIL_DESCRIPTION = 'User email address';
export const AUTH_PASSWORD_DESCRIPTION = 'User password';

export const AUTH_RESPONSE_DESCRIPTION = 'Authentication response';
export const AUTH_RESPONSE_USER_DESCRIPTION = 'Authenticated user';
export const AUTH_RESPONSE_ACCESS_TOKEN_DESCRIPTION =
  'JWT access token for authentication';

export const LOGIN_MUTATION_DESCRIPTION = 'Login with email and password';
export const REGISTER_MUTATION_DESCRIPTION = 'Register a new user account';
export const NEW_TOKENS_QUERY_DESCRIPTION =
  'Refresh access token using refresh token';
export const LOGOUT_MUTATION_DESCRIPTION = 'Logout and clear refresh token';
