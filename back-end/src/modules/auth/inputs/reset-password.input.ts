import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType({ description: 'Input for resetting password' })
export class ResetPasswordInput {
  @Field(() => String, { description: 'Password reset token from email' })
  @IsNotEmpty({ message: 'Token cannot be empty' })
  token!: string

  @Field(() => String, { description: 'New password' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(50, { message: 'Password must contain at most 50 characters' })
  newPassword!: string
}
