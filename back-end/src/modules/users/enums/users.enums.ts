import { registerEnumType } from '@nestjs/graphql'
import {
  GENDER,
  ACTIVITY_LEVEL,
  NUTRITION_GOAL,
  ROLE,
} from '@prisma/generated/enums'
import {
  ACTIVITY_LEVEL_ENUM_DESCRIPTION,
  GENDER_ENUM_DESCRIPTION,
  NUTRITION_GOAL_ENUM_DESCRIPTION,
  ROLE_ENUM_DESCRIPTION,
} from '../users.constants'

registerEnumType(GENDER, {
  name: 'GENDER',
  description: GENDER_ENUM_DESCRIPTION,
})

registerEnumType(ACTIVITY_LEVEL, {
  name: 'ACTIVITY_LEVEL',
  description: ACTIVITY_LEVEL_ENUM_DESCRIPTION,
})

registerEnumType(NUTRITION_GOAL, {
  name: 'NUTRITION_GOAL',
  description: NUTRITION_GOAL_ENUM_DESCRIPTION,
})

registerEnumType(ROLE, {
  name: 'ROLE',
  description: ROLE_ENUM_DESCRIPTION,
})
