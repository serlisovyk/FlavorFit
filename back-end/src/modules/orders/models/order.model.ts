import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prisma, Order } from '@prisma/generated/prisma/client';
import { ORDER_STATUS } from '@prisma/generated/prisma/enums';
import { BaseModel } from '@/shared/models/base.model';
import { OrderItemModel } from './order-item.model';
import {
  ORDER_MODEL_DESCRIPTION,
  ORDER_ID_FIELD_DESCRIPTION,
  ORDER_STATUS_FIELD_DESCRIPTION,
  ORDER_TOTAL_FIELD_DESCRIPTION,
  ORDER_USER_ID_FIELD_DESCRIPTION,
  ORDER_ITEMS_FIELD_DESCRIPTION,
} from '../orders.constants';

@ObjectType({ description: ORDER_MODEL_DESCRIPTION })
export class OrderModel extends BaseModel implements Order {
  @Field(() => String, {
    nullable: false,
    description: ORDER_ID_FIELD_DESCRIPTION,
  })
  orderId!: string;

  @Field(() => ORDER_STATUS, {
    defaultValue: ORDER_STATUS.PENDING,
    nullable: false,
    description: ORDER_STATUS_FIELD_DESCRIPTION,
  })
  status!: `${ORDER_STATUS}`;

  @Field(() => Float, {
    nullable: false,
    description: ORDER_TOTAL_FIELD_DESCRIPTION,
  })
  total!: Prisma.Decimal;

  @Field(() => String, {
    nullable: false,
    description: ORDER_USER_ID_FIELD_DESCRIPTION,
  })
  userId!: string;

  @Field(() => [OrderItemModel], {
    nullable: false,
    description: ORDER_ITEMS_FIELD_DESCRIPTION,
  })
  items!: OrderItemModel[];
}
