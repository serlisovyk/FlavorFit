import { Field, InputType } from '@nestjs/graphql';
import { UNIT } from '@prisma/generated/graphql/prisma';

@InputType()
export class IngredientUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => UNIT, { nullable: true })
  defaultUnit?: `${UNIT}`;
}
