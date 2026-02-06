import { registerEnumType } from '@nestjs/graphql';

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(ORDER_STATUS, {
  name: 'ORDER_STATUS',
  description: undefined,
});
