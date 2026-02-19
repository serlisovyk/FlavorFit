import { ObjectType, Field, Float } from '@nestjs/graphql'
import { Prisma, RecipeIngredient } from '@prisma/generated/client'
import { UNIT } from '@prisma/generated/enums'
import { BaseModel } from '@/shared/models/base.model'
import { IngredientModel } from '../ingredients/models/ingredient.model'

@ObjectType({ description: 'Recipe ingredient details' })
export class RecipeIngredientModel
  extends BaseModel
  implements RecipeIngredient
{
  @Field(() => Float, {
    nullable: false,
    description: 'Quantity of ingredient',
  })
  quantity!: Prisma.Decimal

  @Field(() => UNIT, {
    defaultValue: UNIT.GRAM,
    nullable: false,
    description: 'Unit of measurement',
  })
  unit!: `${UNIT}`

  @Field(() => IngredientModel, {
    nullable: false,
    description: 'Ingredient details',
  })
  ingredient?: IngredientModel

  @Field(() => String, {
    nullable: false,
    description: 'Recipe ID',
  })
  recipeId!: string

  @Field(() => String, {
    nullable: false,
    description: 'Ingredient ID',
  })
  ingredientId!: string
}
