import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Admin } from '../auth/decorators/admin.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { RecipeModel } from './models/recipe.model'
import { RecipeInput } from './inputs/recipe.input'
import { RecipesQueryInput } from './inputs/recipes-query.input'
import { AdminRecipesService } from './admin-recipes.service'
import { RecipesService } from './recipes.service'

@Resolver()
export class RecipesResolver {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly adminRecipesService: AdminRecipesService,
  ) {}

  @Query(() => [RecipeModel], {
    name: 'recipes',
    description: 'Get all recipes with pagination and filters',
  })
  getAll(@Args('input') input: RecipesQueryInput) {
    return this.recipesService.getAll(input)
  }

  @Query(() => RecipeModel, {
    name: 'recipeBySlug',
    description: 'Get recipe by slug',
  })
  getBySlug(@Args('slug') slug: string) {
    return this.recipesService.getBySlug(slug)
  }

  @Query(() => [RecipeModel], {
    name: 'adminRecipes',
    description: 'Get all recipes for admin',
  })
  @Admin()
  getAllAdmin() {
    return this.adminRecipesService.getAll()
  }

  @Query(() => RecipeModel, {
    name: 'recipeById',
    description: 'Get recipe by ID',
  })
  @Admin()
  getById(@Args('id') id: string) {
    return this.adminRecipesService.getById(id)
  }

  @Mutation(() => RecipeModel, {
    name: 'createRecipe',
    description: 'Create a new recipe',
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
    description: 'Update an existing recipe',
  })
  @Admin()
  update(@Args('id') id: string, @Args('input') input: RecipeInput) {
    return this.adminRecipesService.update(id, input)
  }

  @Mutation(() => RecipeModel, {
    name: 'deleteRecipeById',
    description: 'Delete a recipe by ID',
  })
  @Admin()
  delete(@Args('id') id: string) {
    return this.adminRecipesService.delete(id)
  }
}
