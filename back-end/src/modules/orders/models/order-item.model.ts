import { ObjectType, Field, Float } from '@nestjs/graphql'
import { Prisma, OrderItem } from '@prisma/generated/client'
import { RecipeIngredientModel } from '@/modules/recipes/models/recipe-ingredient.model'
import { BaseModel } from '@/shared/models/base.model'

@ObjectType({ description: 'Order item details' })
export class OrderItemModel extends BaseModel implements OrderItem {
  @Field(() => Float, {
    defaultValue: 1,
    nullable: true,
    description: 'Quantity of the item',
  })
  quantity!: Prisma.Decimal | null

  @Field(() => Float, {
    nullable: false,
    description: 'Price of the item',
  })
  price!: Prisma.Decimal

  @Field(() => String, {
    nullable: false,
    description: 'Recipe ingredient ID',
  })
  recipeIngredientId!: string

  @Field(() => String, {
    nullable: false,
    description: 'Associated order ID',
  })
  orderId!: string

  @Field(() => RecipeIngredientModel, {
    nullable: false,
    description: 'Recipe ingredient details',
  })
  recipeIngredient?: RecipeIngredientModel
}
