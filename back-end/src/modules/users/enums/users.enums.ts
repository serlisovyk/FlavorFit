import { registerEnumType } from '@nestjs/graphql'
import {
  GENDER,
  ACTIVITY_LEVEL,
  NUTRITION_GOAL,
  ROLE,
} from '@prisma/generated/enums'

registerEnumType(GENDER, {
  name: 'GENDER',
  description: 'User gender',
})

registerEnumType(ACTIVITY_LEVEL, {
  name: 'ACTIVITY_LEVEL',
  description: 'User physical activity level',
})

registerEnumType(NUTRITION_GOAL, {
  name: 'NUTRITION_GOAL',
  description: 'User nutrition goal (weight loss, maintenance, weight gain)',
})

registerEnumType(ROLE, {
  name: 'ROLE',
  description: 'User role in the system',
})
