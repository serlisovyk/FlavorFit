import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { OrderModel } from './models/order.model'
import { OrderInput } from './inputs/order.input'
import { OrdersService } from './orders.service'

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [OrderModel], {
    name: 'getOrders',
    description: 'Get all orders for the current user',
  })
  @Auth()
  getAllByUserId(@CurrentUser('id') userId: string) {
    return this.ordersService.getAllByUserId(userId)
  }

  @Mutation(() => OrderModel, {
    name: 'createOrder',
    description: 'Create a new order',
  })
  @Auth()
  createOrder(
    @CurrentUser('id') userId: string,
    @Args('input') input: OrderInput,
  ) {
    return this.ordersService.makeOrder(userId, input)
  }
}
