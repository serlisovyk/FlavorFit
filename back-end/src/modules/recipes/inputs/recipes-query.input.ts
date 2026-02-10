import { InputType, Field, Int } from '@nestjs/graphql';
import type { RecipeSortOption } from '../recipes.types';

@InputType()
export class RecipesQueryInput {
  @Field(() => Int, { defaultValue: 1 })
  page!: number;

  @Field(() => Int, { defaultValue: 10 })
  limit!: number;

  @Field(() => String, { nullable: true })
  searchTerm?: string;

  @Field(() => String, { nullable: true })
  sort?: RecipeSortOption;
}
