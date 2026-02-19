import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType({ description: 'Login or registration credentials' })
export class AuthInput {
  @Field(() => String, { description: 'User email address' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Email must be a valid address' })
  email!: string

  @Field(() => String, { description: 'User password' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(50, { message: 'Password must contain at most 50 characters' })
  password!: string
}
