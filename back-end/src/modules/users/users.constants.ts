export const USER_ALREADY_EXISTS_ERROR = 'User with this email already exists';

export const GENDER_ENUM_DESCRIPTION = 'User gender';
export const ACTIVITY_LEVEL_ENUM_DESCRIPTION = 'User physical activity level';
export const NUTRITION_GOAL_ENUM_DESCRIPTION =
  'User nutrition goal (weight loss, maintenance, weight gain)';
export const ROLE_ENUM_DESCRIPTION = 'User role in the system';

export const MEASUREMENT_MODEL_DESCRIPTION = 'User physical measurements model';
export const MEASUREMENT_HEIGHT_DESCRIPTION = 'User height in centimeters';
export const MEASUREMENT_WEIGHT_DESCRIPTION = 'User weight in kilograms';
export const MEASUREMENT_GOAL_WEIGHT_DESCRIPTION =
  'User target weight in kilograms';
export const MEASUREMENT_CHEST_DESCRIPTION =
  'Chest circumference in centimeters';
export const MEASUREMENT_WAIST_DESCRIPTION =
  'Waist circumference in centimeters';
export const MEASUREMENT_THIGH_DESCRIPTION =
  'Thigh circumference in centimeters';
export const MEASUREMENT_ARM_DESCRIPTION = 'Arm circumference in centimeters';
export const MEASUREMENT_ACTIVITY_LEVEL_DESCRIPTION = 'Physical activity level';
export const MEASUREMENT_NUTRITION_GOAL_DESCRIPTION = 'Nutrition goal';
export const MEASUREMENT_USER_ID_DESCRIPTION =
  'ID of the user who owns the measurements';

export const PROFILE_MODEL_DESCRIPTION = 'User profile model';
export const PROFILE_FULL_NAME_DESCRIPTION = 'User full name';
export const PROFILE_GENDER_DESCRIPTION = 'User gender';
export const PROFILE_AGE_DESCRIPTION = 'User age';
export const PROFILE_BIO_DESCRIPTION = 'User biography';
export const PROFILE_USER_ID_DESCRIPTION =
  'ID of the user who owns the profile';

export const USER_MODEL_DESCRIPTION = 'System user model';
export const USER_EMAIL_DESCRIPTION = 'User email address';
export const USER_PASSWORD_DESCRIPTION = 'User password (hashed)';
export const USER_ROLE_DESCRIPTION = 'User role in the system';
export const USER_PROFILE_DESCRIPTION = 'User profile';
export const USER_MEASUREMENTS_DESCRIPTION = 'User physical measurements';
export const USER_RECIPES_DESCRIPTION = 'Recipes created by the user';
export const USER_LIKES_DESCRIPTION = 'IDs of liked recipes';
export const USER_ORDERS_DESCRIPTION = 'User orders';

export const MEASUREMENT_UPDATE_INPUT_DESCRIPTION =
  'Data for updating user physical measurements';
export const MEASUREMENT_UPDATE_HEIGHT_DESCRIPTION = 'Height in centimeters';
export const MEASUREMENT_UPDATE_WEIGHT_DESCRIPTION = 'Weight in kilograms';
export const MEASUREMENT_UPDATE_GOAL_WEIGHT_DESCRIPTION =
  'Target weight in kilograms';
export const MEASUREMENT_UPDATE_CHEST_DESCRIPTION =
  'Chest circumference in centimeters';
export const MEASUREMENT_UPDATE_WAIST_DESCRIPTION =
  'Waist circumference in centimeters';
export const MEASUREMENT_UPDATE_THIGH_DESCRIPTION =
  'Thigh circumference in centimeters';
export const MEASUREMENT_UPDATE_ARM_DESCRIPTION =
  'Arm circumference in centimeters';
export const MEASUREMENT_UPDATE_ACTIVITY_LEVEL_DESCRIPTION =
  'Physical activity level';
export const MEASUREMENT_UPDATE_NUTRITION_GOAL_DESCRIPTION = 'Nutrition goal';

export const PROFILE_UPDATE_INPUT_DESCRIPTION =
  'Data for updating user profile';
export const PROFILE_UPDATE_FULL_NAME_DESCRIPTION = 'User full name';
export const PROFILE_UPDATE_GENDER_DESCRIPTION = 'User gender';
export const PROFILE_UPDATE_AGE_DESCRIPTION = 'User age';
export const PROFILE_UPDATE_BIO_DESCRIPTION = 'User biography';

export const USER_UPDATE_INPUT_DESCRIPTION = 'Data for updating user';
export const USER_UPDATE_EMAIL_DESCRIPTION = 'User email address';
export const USER_UPDATE_PASSWORD_DESCRIPTION = 'New user password';
export const USER_UPDATE_PROFILE_DESCRIPTION = 'Profile data to update';
export const USER_UPDATE_MEASUREMENTS_DESCRIPTION =
  'Physical measurements data to update';

export const GET_PROFILE_QUERY_DESCRIPTION = 'Get current user profile';
export const UPDATE_PROFILE_MUTATION_DESCRIPTION =
  'Update current user profile';

export const MEASUREMENT_HEIGHT_MIN_ERROR = 'Height must be a positive number';
export const MEASUREMENT_WEIGHT_MIN_ERROR = 'Weight must be a positive number';
export const MEASUREMENT_GOAL_WEIGHT_MIN_ERROR =
  'Target weight must be a positive number';
export const MEASUREMENT_CHEST_MIN_ERROR =
  'Chest circumference must be a positive number';
export const MEASUREMENT_WAIST_MIN_ERROR =
  'Waist circumference must be a positive number';
export const MEASUREMENT_THIGH_MIN_ERROR =
  'Thigh circumference must be a positive number';
export const MEASUREMENT_ARM_MIN_ERROR =
  'Arm circumference must be a positive number';
export const MEASUREMENT_ACTIVITY_LEVEL_ENUM_ERROR =
  'Activity level must be one of the allowed values';
export const MEASUREMENT_NUTRITION_GOAL_ENUM_ERROR =
  'Nutrition goal must be one of the allowed values';

export const PROFILE_FULL_NAME_NOT_EMPTY_ERROR = 'Name cannot be empty';
export const PROFILE_FULL_NAME_MIN_LENGTH_ERROR =
  'Name must contain at least 2 characters';
export const PROFILE_FULL_NAME_MAX_LENGTH_ERROR =
  'Name must contain at most 100 characters';
export const PROFILE_AGE_MIN_ERROR = 'Age must be a positive number';
export const PROFILE_AGE_MAX_ERROR = 'Age cannot exceed 150 years';
export const PROFILE_GENDER_ENUM_ERROR =
  'Gender must be one of the allowed values';
export const PROFILE_BIO_MAX_LENGTH_ERROR =
  'Biography must contain at most 500 characters';

export const USER_EMAIL_IS_EMAIL_ERROR = 'Email must be a valid address';
export const USER_PASSWORD_MIN_LENGTH_ERROR =
  'Password must contain at least 6 characters';
export const USER_PASSWORD_MAX_LENGTH_ERROR =
  'Password must contain at most 50 characters';
export const USER_PROFILE_VALID_ERROR = 'Profile contains invalid data';
export const USER_MEASUREMENTS_VALID_ERROR =
  'Measurements contain invalid data';
