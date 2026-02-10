import { InputType, Field, Int } from '@nestjs/graphql';
import {
  RECIPES_QUERY_INPUT_DESCRIPTION,
  RECIPES_QUERY_PAGE_FIELD_DESCRIPTION,
  RECIPES_QUERY_LIMIT_FIELD_DESCRIPTION,
  RECIPES_QUERY_SEARCH_TERM_FIELD_DESCRIPTION,
  RECIPES_QUERY_SORT_FIELD_DESCRIPTION,
} from '../recipes.constants';
import type { RECIPE_SORT_OPTIONS } from '../recipes.types';

@InputType({ description: RECIPES_QUERY_INPUT_DESCRIPTION })
export class RecipesQueryInput {
  @Field(() => Int, {
    defaultValue: 1,
    description: RECIPES_QUERY_PAGE_FIELD_DESCRIPTION,
  })
  page!: number;

  @Field(() => Int, {
    defaultValue: 10,
    description: RECIPES_QUERY_LIMIT_FIELD_DESCRIPTION,
  })
  limit!: number;

  @Field(() => String, {
    nullable: true,
    description: RECIPES_QUERY_SEARCH_TERM_FIELD_DESCRIPTION,
  })
  searchTerm?: string;

  @Field(() => String, {
    nullable: true,
    description: RECIPES_QUERY_SORT_FIELD_DESCRIPTION,
  })
  sort?: RECIPE_SORT_OPTIONS;
}
