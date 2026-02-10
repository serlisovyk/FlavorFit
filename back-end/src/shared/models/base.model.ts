import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BASE_MODEL_DESCRIPTION,
  BASE_MODEL_ID_DESCRIPTION,
  BASE_MODEL_CREATED_AT_DESCRIPTION,
  BASE_MODEL_UPDATED_AT_DESCRIPTION,
} from '../constants';

@ObjectType({ description: BASE_MODEL_DESCRIPTION, isAbstract: true })
export class BaseModel {
  @Field(() => ID, { description: BASE_MODEL_ID_DESCRIPTION, nullable: false })
  id!: string;

  @Field(() => Date, {
    description: BASE_MODEL_CREATED_AT_DESCRIPTION,
    nullable: false,
  })
  createdAt!: Date;

  @Field(() => Date, {
    description: BASE_MODEL_UPDATED_AT_DESCRIPTION,
    nullable: false,
  })
  updatedAt!: Date;
}
