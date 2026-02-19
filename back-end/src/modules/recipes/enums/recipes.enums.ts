import { registerEnumType } from '@nestjs/graphql'
import { DIFFICULTY, UNIT } from '@prisma/generated/enums'

registerEnumType(UNIT, {
  name: 'UNIT',
  description: 'Units of measurement for recipe ingredients',
})

registerEnumType(DIFFICULTY, {
  name: 'DIFFICULTY',
  description: 'Difficulty levels for recipes',
})
