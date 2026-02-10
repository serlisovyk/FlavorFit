import { ObjectType, Field } from '@nestjs/graphql';
import {
  TOGGLE_LIKE_RESPONSE_DESCRIPTION,
  TOGGLE_LIKE_LIKED_FIELD_DESCRIPTION,
} from '../reactions.constants';

@ObjectType({ description: TOGGLE_LIKE_RESPONSE_DESCRIPTION })
export class ToggleLikeResponse {
  @Field(() => Boolean, { description: TOGGLE_LIKE_LIKED_FIELD_DESCRIPTION })
  liked!: boolean;
}
