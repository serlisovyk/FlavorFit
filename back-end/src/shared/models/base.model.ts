import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType({ description: 'Base model with common fields', isAbstract: true })
export class BaseModel {
  @Field(() => ID, {
    description: 'Unique identifier for the entity',
    nullable: false,
  })
  id!: string

  @Field(() => Date, {
    description: 'Timestamp when the entity was created',
    nullable: false,
  })
  createdAt!: Date

  @Field(() => Date, {
    description: 'Timestamp when the entity was last updated',
    nullable: false,
  })
  updatedAt!: Date
}
