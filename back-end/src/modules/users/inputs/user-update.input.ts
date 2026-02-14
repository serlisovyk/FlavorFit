import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { MeasurementUpdateInput } from './measurement-update.input'
import { ProfileUpdateInput } from './profile-update.input'
import {
  USER_EMAIL_IS_EMAIL_ERROR,
  USER_MEASUREMENTS_VALID_ERROR,
  USER_PASSWORD_MAX_LENGTH_ERROR,
  USER_PASSWORD_MIN_LENGTH_ERROR,
  USER_PROFILE_VALID_ERROR,
  USER_UPDATE_EMAIL_DESCRIPTION,
  USER_UPDATE_INPUT_DESCRIPTION,
  USER_UPDATE_MEASUREMENTS_DESCRIPTION,
  USER_UPDATE_PASSWORD_DESCRIPTION,
  USER_UPDATE_PROFILE_DESCRIPTION,
} from '../users.constants'

@InputType({ description: USER_UPDATE_INPUT_DESCRIPTION })
export class UserUpdateInput {
  @Field(() => String, {
    nullable: true,
    description: USER_UPDATE_EMAIL_DESCRIPTION,
  })
  @IsOptional()
  @IsEmail({}, { message: USER_EMAIL_IS_EMAIL_ERROR })
  email?: string

  @Field(() => String, {
    nullable: true,
    description: USER_UPDATE_PASSWORD_DESCRIPTION,
  })
  @IsOptional()
  @MinLength(6, { message: USER_PASSWORD_MIN_LENGTH_ERROR })
  @MaxLength(50, { message: USER_PASSWORD_MAX_LENGTH_ERROR })
  password?: string

  @Field(() => ProfileUpdateInput, {
    nullable: true,
    description: USER_UPDATE_PROFILE_DESCRIPTION,
  })
  @IsOptional()
  @ValidateNested({ message: USER_PROFILE_VALID_ERROR })
  @Type(() => ProfileUpdateInput)
  profile?: ProfileUpdateInput

  @Field(() => MeasurementUpdateInput, {
    nullable: true,
    description: USER_UPDATE_MEASUREMENTS_DESCRIPTION,
  })
  @IsOptional()
  @ValidateNested({ message: USER_MEASUREMENTS_VALID_ERROR })
  @Type(() => MeasurementUpdateInput)
  measurements?: MeasurementUpdateInput
}
