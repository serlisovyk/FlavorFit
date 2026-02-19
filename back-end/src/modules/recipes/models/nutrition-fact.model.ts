import { ObjectType, Field, Float } from '@nestjs/graphql'
import { Prisma, NutritionFact } from '@prisma/generated/client'
import { BaseModel } from '@/shared/models/base.model'

@ObjectType({ description: 'Nutrition facts details' })
export class NutritionFactModel extends BaseModel implements NutritionFact {
  @Field(() => Float, {
    nullable: false,
    description: 'Calorie content',
  })
  calories!: Prisma.Decimal

  @Field(() => Float, {
    nullable: false,
    description: 'Protein content in grams',
  })
  proteins!: Prisma.Decimal

  @Field(() => Float, {
    nullable: false,
    description: 'Fat content in grams',
  })
  fats!: Prisma.Decimal

  @Field(() => Float, {
    nullable: false,
    description: 'Carbohydrate content in grams',
  })
  carbohydrates!: Prisma.Decimal

  @Field(() => Float, {
    nullable: false,
    description: 'Fiber content in grams',
  })
  fiber!: Prisma.Decimal

  @Field(() => String, {
    nullable: false,
    description: 'Recipe ID',
  })
  recipeId!: string
}
