import { ObjectType, Field, Float } from '@nestjs/graphql'
import { Prisma, Order } from '@prisma/generated/client'
import { ORDER_STATUS } from '@prisma/generated/enums'
import { BaseModel } from '@/shared/models/base.model'
import { OrderItemModel } from './order-item.model'
import '../enums/order.enums'

@ObjectType({ description: 'Order details' })
export class OrderModel extends BaseModel implements Order {
  @Field(() => String, {
    nullable: false,
    description: 'Unique order identifier',
  })
  orderId!: string

  @Field(() => ORDER_STATUS, {
    defaultValue: ORDER_STATUS.PENDING,
    nullable: false,
    description: 'Current status of the order',
  })
  status!: `${ORDER_STATUS}`

  @Field(() => Float, {
    nullable: false,
    description: 'Total cost of the order',
  })
  total!: Prisma.Decimal

  @Field(() => String, {
    nullable: false,
    description: 'User who placed the order',
  })
  userId!: string

  @Field(() => [OrderItemModel], {
    nullable: false,
    description: 'List of items in the order',
  })
  items!: OrderItemModel[]
}
