import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { ORDER_STATUS } from '../enums/order.enums';

@InputType()
export class OrderCreateInput {
  @Field(() => [OrderItemInput])
  items!: OrderItemInput[];
}

@InputType()
export class OrderUpdateStatusInput {
  @Field(() => ORDER_STATUS)
  status!: string;
}

@InputType()
export class OrderItemInput {
  @Field(() => ID)
  recipeIngredientId!: string;

  @Field(() => Float, { defaultValue: 1 })
  quantity!: number;
}
