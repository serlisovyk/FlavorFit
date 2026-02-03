import { Field, InputType } from '@nestjs/graphql';
import { UNIT } from '@prisma/generated/graphql/prisma';

@InputType()
export class IngredientCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => UNIT, { nullable: true })
  defaultUnit!: `${UNIT}`;
}
