import { ObjectType, Field, Float } from '@nestjs/graphql'
import { UNIT, type Ingredient, type Prisma } from '@prisma/generated/client'
import { BaseModel } from '@/shared/models/base.model'

@ObjectType({ description: 'Ingredient details' })
export class IngredientModel extends BaseModel implements Ingredient {
  @Field(() => String, {
    nullable: false,
    description: 'Name of the ingredient',
  })
  name!: string

  @Field(() => String, {
    nullable: false,
    description: 'Icon URL for the ingredient',
  })
  iconUrl!: string

  @Field(() => String, {
    nullable: false,
    description: 'Content description of the ingredient',
  })
  content!: string

  @Field(() => Float, {
    nullable: false,
    description: 'Price of the ingredient',
  })
  price!: Prisma.Decimal

  @Field(() => UNIT, {
    nullable: false,
    description: 'Default unit for measuring the ingredient',
  })
  defaultUnit!: `${UNIT}`
}
