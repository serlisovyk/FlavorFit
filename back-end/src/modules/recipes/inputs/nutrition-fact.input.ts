import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NutritionFactInput {
  @Field(() => Float, { nullable: false })
  proteins!: number;

  @Field(() => Float, { nullable: false })
  fats!: number;

  @Field(() => Float, { nullable: false })
  carbohydrates!: number;

  @Field(() => Float, { nullable: false })
  fiber!: number;

  @Field(() => Int, { nullable: false })
  calories!: number;
}
