import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Admin } from '../auth/decorators/admin.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { RecipeModel } from './models/recipe.model'
import { RecipeInput } from './inputs/recipe.input'
import { RecipesQueryInput } from './inputs/recipes-query.input'
import { AdminRecipesService } from './admin-recipes.service'
import { RecipesService } from './recipes.service'
import {
  GET_RECIPES_QUERY_DESCRIPTION,
  GET_RECIPE_BY_SLUG_QUERY_DESCRIPTION,
  GET_ADMIN_RECIPES_QUERY_DESCRIPTION,
  GET_RECIPE_BY_ID_QUERY_DESCRIPTION,
  CREATE_RECIPE_MUTATION_DESCRIPTION,
  UPDATE_RECIPE_MUTATION_DESCRIPTION,
  DELETE_RECIPE_MUTATION_DESCRIPTION,
} from './recipes.constants'

@Resolver()
export class RecipesResolver {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly adminRecipesService: AdminRecipesService,
  ) {}

  @Query(() => [RecipeModel], {
    name: 'recipes',
    description: GET_RECIPES_QUERY_DESCRIPTION,
  })
  getAll(@Args('input') input: RecipesQueryInput) {
    return this.recipesService.getAll(input)
  }

  @Query(() => RecipeModel, {
    name: 'recipeBySlug',
    description: GET_RECIPE_BY_SLUG_QUERY_DESCRIPTION,
  })
  getBySlug(@Args('slug') slug: string) {
    return this.recipesService.getBySlug(slug)
  }

  @Query(() => [RecipeModel], {
    name: 'adminRecipes',
    description: GET_ADMIN_RECIPES_QUERY_DESCRIPTION,
  })
  @Admin()
  getAllAdmin() {
    return this.adminRecipesService.getAll()
  }

  @Query(() => RecipeModel, {
    name: 'recipeById',
    description: GET_RECIPE_BY_ID_QUERY_DESCRIPTION,
  })
  @Admin()
  getById(@Args('id') id: string) {
    return this.adminRecipesService.getById(id)
  }

  @Mutation(() => RecipeModel, {
    name: 'createRecipe',
    description: CREATE_RECIPE_MUTATION_DESCRIPTION,
  })
  @Admin()
  create(
    @CurrentUser('id') authorId: string,
    @Args('input') input: RecipeInput,
  ) {
    return this.adminRecipesService.create(authorId, input)
  }

  @Mutation(() => RecipeModel, {
    name: 'updateRecipe',
    description: UPDATE_RECIPE_MUTATION_DESCRIPTION,
  })
  @Admin()
  update(@Args('id') id: string, @Args('input') input: RecipeInput) {
    return this.adminRecipesService.update(id, input)
  }

  @Mutation(() => RecipeModel, {
    name: 'deleteRecipeById',
    description: DELETE_RECIPE_MUTATION_DESCRIPTION,
  })
  @Admin()
  delete(@Args('id') id: string) {
    return this.adminRecipesService.delete(id)
  }
}
