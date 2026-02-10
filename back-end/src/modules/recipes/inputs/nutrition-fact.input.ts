import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsInt } from 'class-validator';
import {
  NUTRITION_FACT_INPUT_DESCRIPTION,
  NUTRITION_PROTEINS_FIELD_DESCRIPTION,
  NUTRITION_FATS_FIELD_DESCRIPTION,
  NUTRITION_CARBOHYDRATES_FIELD_DESCRIPTION,
  NUTRITION_FIBER_FIELD_DESCRIPTION,
  NUTRITION_CALORIES_FIELD_DESCRIPTION,
  NUTRITION_PROTEINS_POSITIVE_ERROR,
  NUTRITION_PROTEINS_NUMBER_ERROR,
  NUTRITION_FATS_POSITIVE_ERROR,
  NUTRITION_FATS_NUMBER_ERROR,
  NUTRITION_CARBOHYDRATES_POSITIVE_ERROR,
  NUTRITION_CARBOHYDRATES_NUMBER_ERROR,
  NUTRITION_FIBER_POSITIVE_ERROR,
  NUTRITION_FIBER_NUMBER_ERROR,
  NUTRITION_CALORIES_POSITIVE_ERROR,
  NUTRITION_CALORIES_NUMBER_ERROR,
} from '../recipes.constants';

@InputType({ description: NUTRITION_FACT_INPUT_DESCRIPTION })
export class NutritionFactInput {
  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_PROTEINS_FIELD_DESCRIPTION,
  })
  @IsNumber({}, { message: NUTRITION_PROTEINS_NUMBER_ERROR })
  @IsPositive({ message: NUTRITION_PROTEINS_POSITIVE_ERROR })
  proteins!: number;

  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_FATS_FIELD_DESCRIPTION,
  })
  @IsNumber({}, { message: NUTRITION_FATS_NUMBER_ERROR })
  @IsPositive({ message: NUTRITION_FATS_POSITIVE_ERROR })
  fats!: number;

  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_CARBOHYDRATES_FIELD_DESCRIPTION,
  })
  @IsNumber({}, { message: NUTRITION_CARBOHYDRATES_NUMBER_ERROR })
  @IsPositive({ message: NUTRITION_CARBOHYDRATES_POSITIVE_ERROR })
  carbohydrates!: number;

  @Field(() => Float, {
    nullable: false,
    description: NUTRITION_FIBER_FIELD_DESCRIPTION,
  })
  @IsNumber({}, { message: NUTRITION_FIBER_NUMBER_ERROR })
  @IsPositive({ message: NUTRITION_FIBER_POSITIVE_ERROR })
  fiber!: number;

  @Field(() => Int, {
    nullable: false,
    description: NUTRITION_CALORIES_FIELD_DESCRIPTION,
  })
  @IsInt({ message: NUTRITION_CALORIES_NUMBER_ERROR })
  @IsPositive({ message: NUTRITION_CALORIES_POSITIVE_ERROR })
  calories!: number;
}
