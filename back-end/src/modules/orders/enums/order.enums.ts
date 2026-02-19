import { registerEnumType } from '@nestjs/graphql'
import { ORDER_STATUS } from '@prisma/generated/enums'

registerEnumType(ORDER_STATUS, {
  name: 'ORDER_STATUS',
  description: 'The status of an order',
})
