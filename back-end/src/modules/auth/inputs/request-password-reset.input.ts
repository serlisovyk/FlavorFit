import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'

@InputType({ description: 'Input for requesting password reset' })
export class RequestPasswordResetInput {
  @Field(() => String, { description: 'Email address for password reset' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Email must be a valid address' })
  email!: string
}
