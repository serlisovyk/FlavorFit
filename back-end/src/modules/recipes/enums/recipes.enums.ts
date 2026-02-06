import { registerEnumType } from '@nestjs/graphql';

export enum DIFFICULTY {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum UNIT {
  GRAM = 'GRAM',
  MILLILITER = 'MILLILITER',
  PIECE = 'PIECE',
  TEASPOON = 'TEASPOON',
  TABLESPOON = 'TABLESPOON',
  CLOVES = 'CLOVES',
}

registerEnumType(UNIT, { name: 'UNIT', description: undefined });
registerEnumType(DIFFICULTY, { name: 'DIFFICULTY', description: undefined });
