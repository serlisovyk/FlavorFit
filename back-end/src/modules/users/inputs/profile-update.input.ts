import { InputType, Field, Int } from '@nestjs/graphql'
import { GENDER } from '@prisma/generated/enums'
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

@InputType({ description: 'Data for updating user profile' })
export class ProfileUpdateInput {
  @Field(() => String, {
    nullable: true,
    description: 'User full name',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(2, { message: 'Name must contain at least 2 characters' })
  @MaxLength(100, { message: 'Name must contain at most 100 characters' })
  fullName?: string

  @Field(() => GENDER, {
    nullable: true,
    description: 'User gender',
  })
  @IsOptional()
  @IsEnum(GENDER, { message: 'Gender must be one of the allowed values' })
  gender?: `${GENDER}`

  @Field(() => Int, {
    nullable: true,
    description: 'User age',
  })
  @IsOptional()
  @Min(1, { message: 'Age must be a positive number' })
  @Max(150, { message: 'Age cannot exceed 150 years' })
  age?: number

  @Field(() => String, {
    nullable: true,
    description: 'User biography',
  })
  @IsOptional()
  @MaxLength(500, { message: 'Biography must contain at most 500 characters' })
  bio?: string
}
