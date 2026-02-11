import { registerEnumType } from '@nestjs/graphql';
import { ORDER_STATUS } from '@prisma/generated/enums';
import { ORDER_STATUS_ENUM_DESCRIPTION } from '../orders.constants';

registerEnumType(ORDER_STATUS, {
  name: 'ORDER_STATUS',
  description: ORDER_STATUS_ENUM_DESCRIPTION,
});
