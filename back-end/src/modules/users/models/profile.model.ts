import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from '@prisma/generated/prisma/client';
import { GENDER } from '@prisma/generated/prisma/enums';
import { BaseModel } from '@/shared/models/base.model';
import {
  PROFILE_AGE_DESCRIPTION,
  PROFILE_BIO_DESCRIPTION,
  PROFILE_FULL_NAME_DESCRIPTION,
  PROFILE_GENDER_DESCRIPTION,
  PROFILE_MODEL_DESCRIPTION,
  PROFILE_USER_ID_DESCRIPTION,
} from '../users.constants';

@ObjectType({ description: PROFILE_MODEL_DESCRIPTION })
export class ProfileModel extends BaseModel implements Profile {
  @Field(() => String, {
    nullable: false,
    description: PROFILE_FULL_NAME_DESCRIPTION,
  })
  fullName!: string;

  @Field(() => GENDER, {
    nullable: true,
    description: PROFILE_GENDER_DESCRIPTION,
  })
  gender!: `${GENDER}` | null;

  @Field(() => Int, { nullable: true, description: PROFILE_AGE_DESCRIPTION })
  age!: number | null;

  @Field(() => String, { nullable: true, description: PROFILE_BIO_DESCRIPTION })
  bio!: string | null;

  @Field(() => String, {
    nullable: false,
    description: PROFILE_USER_ID_DESCRIPTION,
  })
  userId!: string;
}
