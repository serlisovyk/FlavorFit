import { InputType, Field, Int } from '@nestjs/graphql'
import { RECIPE_SORT_OPTIONS } from '../recipes.types'

@InputType({ description: 'Query parameters for recipes search' })
export class RecipesQueryInput {
  @Field(() => Int, {
    defaultValue: 1,
    description: 'Page number for pagination',
  })
  page!: number

  @Field(() => Int, {
    defaultValue: 10,
    description: 'Number of items per page',
  })
  limit!: number

  @Field(() => String, {
    nullable: true,
    description: 'Search term to filter recipes',
  })
  searchTerm?: string

  @Field(() => String, {
    nullable: true,
    description: 'Sort option for recipes',
  })
  sort?: RECIPE_SORT_OPTIONS
}
