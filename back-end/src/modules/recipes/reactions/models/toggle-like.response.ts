import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType({ description: 'Response for toggle like action' })
export class ToggleLikeResponse {
  @Field(() => Boolean, { description: 'Whether the recipe is now liked' })
  liked!: boolean
}
