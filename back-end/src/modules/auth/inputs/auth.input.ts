import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import {
  AUTH_EMAIL_DESCRIPTION,
  AUTH_EMAIL_IS_EMAIL_ERROR,
  AUTH_EMAIL_NOT_EMPTY_ERROR,
  AUTH_INPUT_DESCRIPTION,
  AUTH_PASSWORD_DESCRIPTION,
  AUTH_PASSWORD_MAX_LENGTH_ERROR,
  AUTH_PASSWORD_MIN_LENGTH_ERROR,
  AUTH_PASSWORD_NOT_EMPTY_ERROR,
} from '../auth.constants'

@InputType({ description: AUTH_INPUT_DESCRIPTION })
export class AuthInput {
  @Field(() => String, { description: AUTH_EMAIL_DESCRIPTION })
  @IsNotEmpty({ message: AUTH_EMAIL_NOT_EMPTY_ERROR })
  @IsEmail({}, { message: AUTH_EMAIL_IS_EMAIL_ERROR })
  email!: string

  @Field(() => String, { description: AUTH_PASSWORD_DESCRIPTION })
  @IsNotEmpty({ message: AUTH_PASSWORD_NOT_EMPTY_ERROR })
  @MinLength(6, { message: AUTH_PASSWORD_MIN_LENGTH_ERROR })
  @MaxLength(50, { message: AUTH_PASSWORD_MAX_LENGTH_ERROR })
  password!: string
}
