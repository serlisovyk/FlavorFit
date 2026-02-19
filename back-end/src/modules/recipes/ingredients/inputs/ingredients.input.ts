import { Field, Float, InputType, PartialType } from '@nestjs/graphql'
import { type Prisma, UNIT } from '@prisma/generated/client'
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUrl,
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
} from 'class-validator'

@InputType({ description: 'Input for creating a new ingredient' })
export class IngredientsCreateInput {
  @Field(() => String, {
    nullable: false,
    description: 'Name of the ingredient',
  })
  @IsString({ message: 'Ingredient name is required' })
  @IsNotEmpty({ message: 'Ingredient name is required' })
  @MinLength(2, { message: 'Ingredient name must be at least 2 characters' })
  @MaxLength(100, {
    message: 'Ingredient name must not exceed 100 characters',
  })
  name!: string

  @Field(() => String, {
    nullable: false,
    description: 'Icon URL for the ingredient',
  })
  @IsString({ message: 'Icon URL is required' })
  @IsNotEmpty({ message: 'Icon URL is required' })
  @IsUrl({}, { message: 'Icon URL must be a valid URL' })
  iconUrl!: string

  @Field(() => String, {
    nullable: false,
    description: 'Content description of the ingredient',
  })
  @IsString({ message: 'Content is required' })
  @IsNotEmpty({ message: 'Content is required' })
  @MinLength(10, { message: 'Content must be at least 10 characters' })
  content!: string

  @Field(() => Float, {
    nullable: false,
    description: 'Price of the ingredient',
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be positive' })
  price!: Prisma.Decimal

  @Field(() => UNIT, {
    nullable: true,
    description: 'Default unit for measuring the ingredient',
  })
  @IsOptional()
  @IsEnum(UNIT, { message: 'Default unit must be a valid unit type' })
  defaultUnit!: `${UNIT}`
}

@InputType({ description: 'Input for updating an ingredient' })
export class IngredientsUpdateInput extends PartialType(
  IngredientsCreateInput,
) {}
