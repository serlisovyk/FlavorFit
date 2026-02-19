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

@InputType({ description: 'Data for updating user' })
export class UserUpdateInput {
  @Field(() => String, {
    nullable: true,
    description: 'User email address',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid address' })
  email?: string

  @Field(() => String, {
    nullable: true,
    description: 'New user password',
  })
  @IsOptional()
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(50, { message: 'Password must contain at most 50 characters' })
  password?: string

  @Field(() => ProfileUpdateInput, {
    nullable: true,
    description: 'Profile data to update',
  })
  @IsOptional()
  @ValidateNested({ message: 'Profile contains invalid data' })
  @Type(() => ProfileUpdateInput)
  profile?: ProfileUpdateInput

  @Field(() => MeasurementUpdateInput, {
    nullable: true,
    description: 'Physical measurements data to update',
  })
  @IsOptional()
  @ValidateNested({ message: 'Measurements contain invalid data' })
  @Type(() => MeasurementUpdateInput)
  measurements?: MeasurementUpdateInput
}
