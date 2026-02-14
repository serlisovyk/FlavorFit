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
import {
  INGREDIENT_CREATE_INPUT_DESCRIPTION,
  INGREDIENT_UPDATE_INPUT_DESCRIPTION,
  INGREDIENT_NAME_FIELD_DESCRIPTION,
  INGREDIENT_ICON_URL_FIELD_DESCRIPTION,
  INGREDIENT_CONTENT_FIELD_DESCRIPTION,
  INGREDIENT_PRICE_FIELD_DESCRIPTION,
  INGREDIENT_DEFAULT_UNIT_FIELD_DESCRIPTION,
  INGREDIENT_NAME_REQUIRED_ERROR,
  INGREDIENT_NAME_MIN_LENGTH_ERROR,
  INGREDIENT_NAME_MAX_LENGTH_ERROR,
  INGREDIENT_ICON_URL_REQUIRED_ERROR,
  INGREDIENT_ICON_URL_INVALID_ERROR,
  INGREDIENT_CONTENT_REQUIRED_ERROR,
  INGREDIENT_CONTENT_MIN_LENGTH_ERROR,
  INGREDIENT_PRICE_POSITIVE_ERROR,
  INGREDIENT_PRICE_NUMBER_ERROR,
  INGREDIENT_DEFAULT_UNIT_ENUM_ERROR,
} from '../ingredients.constants'

@InputType({ description: INGREDIENT_CREATE_INPUT_DESCRIPTION })
export class IngredientsCreateInput {
  @Field(() => String, {
    nullable: false,
    description: INGREDIENT_NAME_FIELD_DESCRIPTION,
  })
  @IsString({ message: INGREDIENT_NAME_REQUIRED_ERROR })
  @IsNotEmpty({ message: INGREDIENT_NAME_REQUIRED_ERROR })
  @MinLength(2, { message: INGREDIENT_NAME_MIN_LENGTH_ERROR })
  @MaxLength(100, { message: INGREDIENT_NAME_MAX_LENGTH_ERROR })
  name!: string

  @Field(() => String, {
    nullable: false,
    description: INGREDIENT_ICON_URL_FIELD_DESCRIPTION,
  })
  @IsString({ message: INGREDIENT_ICON_URL_REQUIRED_ERROR })
  @IsNotEmpty({ message: INGREDIENT_ICON_URL_REQUIRED_ERROR })
  @IsUrl({}, { message: INGREDIENT_ICON_URL_INVALID_ERROR })
  iconUrl!: string

  @Field(() => String, {
    nullable: false,
    description: INGREDIENT_CONTENT_FIELD_DESCRIPTION,
  })
  @IsString({ message: INGREDIENT_CONTENT_REQUIRED_ERROR })
  @IsNotEmpty({ message: INGREDIENT_CONTENT_REQUIRED_ERROR })
  @MinLength(10, { message: INGREDIENT_CONTENT_MIN_LENGTH_ERROR })
  content!: string

  @Field(() => Float, {
    nullable: false,
    description: INGREDIENT_PRICE_FIELD_DESCRIPTION,
  })
  @IsNumber({}, { message: INGREDIENT_PRICE_NUMBER_ERROR })
  @IsPositive({ message: INGREDIENT_PRICE_POSITIVE_ERROR })
  price!: Prisma.Decimal

  @Field(() => UNIT, {
    nullable: true,
    description: INGREDIENT_DEFAULT_UNIT_FIELD_DESCRIPTION,
  })
  @IsOptional()
  @IsEnum(UNIT, { message: INGREDIENT_DEFAULT_UNIT_ENUM_ERROR })
  defaultUnit!: `${UNIT}`
}

@InputType({ description: INGREDIENT_UPDATE_INPUT_DESCRIPTION })
export class IngredientsUpdateInput extends PartialType(
  IngredientsCreateInput,
) {}
