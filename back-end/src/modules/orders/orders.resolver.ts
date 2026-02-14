import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { OrderModel } from './models/order.model'
import { OrderInput } from './inputs/order.input'
import { OrdersService } from './orders.service'
import {
  GET_ORDERS_QUERY_DESCRIPTION,
  CREATE_ORDER_MUTATION_DESCRIPTION,
} from './orders.constants'

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [OrderModel], {
    name: 'getOrders',
    description: GET_ORDERS_QUERY_DESCRIPTION,
  })
  @Auth()
  getAllByUserId(@CurrentUser('id') userId: string) {
    return this.ordersService.getAllByUserId(userId)
  }

  @Mutation(() => OrderModel, {
    name: 'createOrder',
    description: CREATE_ORDER_MUTATION_DESCRIPTION,
  })
  @Auth()
  createOrder(
    @CurrentUser('id') userId: string,
    @Args('input') input: OrderInput,
  ) {
    return this.ordersService.makeOrder(userId, input)
  }
}
