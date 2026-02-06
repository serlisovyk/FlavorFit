import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OrderItemModel } from './order-item.model';
import { ORDER_STATUS } from '../enums/order.enums';

@ObjectType()
export class OrderModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  orderId!: string;

  @Field(() => ORDER_STATUS, { defaultValue: 'PENDING', nullable: false })
  status!: `${ORDER_STATUS}`;

  @Field(() => [OrderItemModel], { nullable: false })
  items!: OrderItemModel[];

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
