import { Field, InputType } from '@nestjs/graphql';
import { ProfileUpdateWithoutUserInput } from '@prisma/generated/graphql/profile';
import { MeasurementUpdateWithoutUserInput } from '@prisma/generated/graphql/measurement';

@InputType()
export class UserUpdateCustomInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => ProfileUpdateWithoutUserInput, { nullable: true })
  profile?: ProfileUpdateWithoutUserInput;

  @Field(() => MeasurementUpdateWithoutUserInput, { nullable: true })
  measurements?: MeasurementUpdateWithoutUserInput;
}
