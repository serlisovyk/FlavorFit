import { registerEnumType } from '@nestjs/graphql';
import { DIFFICULTY, UNIT } from '@prisma/generated/enums';
import {
  RECIPE_DIFFICULTY_ENUM_DESCRIPTION,
  RECIPE_UNIT_ENUM_DESCRIPTION,
} from '../recipes.constants';

registerEnumType(UNIT, {
  name: 'UNIT',
  description: RECIPE_UNIT_ENUM_DESCRIPTION,
});

registerEnumType(DIFFICULTY, {
  name: 'DIFFICULTY',
  description: RECIPE_DIFFICULTY_ENUM_DESCRIPTION,
});
