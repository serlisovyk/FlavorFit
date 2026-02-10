import { ObjectType, Field } from '@nestjs/graphql';
import {
  BASE_MODEL_DESCRIPTION,
  BASE_MODEL_ID_DESCRIPTION,
  BASE_MODEL_CREATED_AT_DESCRIPTION,
  BASE_MODEL_UPDATED_AT_DESCRIPTION,
} from '../constants';

@ObjectType({ description: BASE_MODEL_DESCRIPTION, isAbstract: true })
export class BaseModel {
  @Field(() => String, { description: BASE_MODEL_ID_DESCRIPTION })
  id!: string;

  @Field(() => Date, { description: BASE_MODEL_CREATED_AT_DESCRIPTION })
  createdAt!: Date;

  @Field(() => Date, { description: BASE_MODEL_UPDATED_AT_DESCRIPTION })
  updatedAt!: Date;
}
