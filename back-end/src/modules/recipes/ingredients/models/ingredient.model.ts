import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UNIT } from '@prisma/generated/graphql/prisma';

@ObjectType()
export class IngredientModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => UNIT, { nullable: false })
  defaultUnit!: `${UNIT}`;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
