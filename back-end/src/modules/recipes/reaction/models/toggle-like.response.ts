import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ToggleLikeResponse {
  @Field(() => Boolean)
  liked!: boolean;
}
