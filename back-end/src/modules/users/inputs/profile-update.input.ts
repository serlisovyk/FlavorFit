import { InputType, Field, Int } from '@nestjs/graphql';
import { GENDER } from '@prisma/generated/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  PROFILE_AGE_MAX_ERROR,
  PROFILE_AGE_MIN_ERROR,
  PROFILE_BIO_MAX_LENGTH_ERROR,
  PROFILE_FULL_NAME_MAX_LENGTH_ERROR,
  PROFILE_FULL_NAME_MIN_LENGTH_ERROR,
  PROFILE_FULL_NAME_NOT_EMPTY_ERROR,
  PROFILE_GENDER_ENUM_ERROR,
  PROFILE_UPDATE_AGE_DESCRIPTION,
  PROFILE_UPDATE_BIO_DESCRIPTION,
  PROFILE_UPDATE_FULL_NAME_DESCRIPTION,
  PROFILE_UPDATE_GENDER_DESCRIPTION,
  PROFILE_UPDATE_INPUT_DESCRIPTION,
} from '../users.constants';

@InputType({ description: PROFILE_UPDATE_INPUT_DESCRIPTION })
export class ProfileUpdateInput {
  @Field(() => String, {
    nullable: true,
    description: PROFILE_UPDATE_FULL_NAME_DESCRIPTION,
  })
  @IsOptional()
  @IsNotEmpty({ message: PROFILE_FULL_NAME_NOT_EMPTY_ERROR })
  @MinLength(2, { message: PROFILE_FULL_NAME_MIN_LENGTH_ERROR })
  @MaxLength(100, { message: PROFILE_FULL_NAME_MAX_LENGTH_ERROR })
  fullName?: string;

  @Field(() => GENDER, {
    nullable: true,
    description: PROFILE_UPDATE_GENDER_DESCRIPTION,
  })
  @IsOptional()
  @IsEnum(GENDER, { message: PROFILE_GENDER_ENUM_ERROR })
  gender?: `${GENDER}`;

  @Field(() => Int, {
    nullable: true,
    description: PROFILE_UPDATE_AGE_DESCRIPTION,
  })
  @IsOptional()
  @Min(1, { message: PROFILE_AGE_MIN_ERROR })
  @Max(150, { message: PROFILE_AGE_MAX_ERROR })
  age?: number;

  @Field(() => String, {
    nullable: true,
    description: PROFILE_UPDATE_BIO_DESCRIPTION,
  })
  @IsOptional()
  @MaxLength(500, { message: PROFILE_BIO_MAX_LENGTH_ERROR })
  bio?: string;
}
