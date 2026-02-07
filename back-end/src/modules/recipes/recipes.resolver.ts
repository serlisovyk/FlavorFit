import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Admin } from '../auth/decorators/admin.decorator';
import type { RecipeInput } from './inputs/recipe.input';
import type { AdminRecipesService } from './admin-recipes.service';
import { RecipesService } from './recipes.service';
import { RecipeModel } from './models/recipe.model';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class RecipesResolver {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly adminRecipesService: AdminRecipesService,
  ) {}

  @Query(() => [RecipeModel], { name: 'recipes' })
  getAll() {
    return this.recipesService.getAll();
  }

  @Query(() => RecipeModel, { name: 'recipeBySlug' })
  getBySlug(@Args('slug') slug: string) {
    return this.recipesService.getBySlug(slug);
  }

  @Query(() => [RecipeModel], { name: 'adminRecipes' })
  @Admin()
  getAllAdmin() {
    return this.adminRecipesService.getAll();
  }

  @Query(() => RecipeModel, { name: 'recipeById' })
  @Admin()
  getById(@Args('id') id: string) {
    return this.adminRecipesService.getById(id);
  }

  @Mutation(() => RecipeModel, { name: 'createRecipe' })
  @Admin()
  create(
    @CurrentUser('id') authorId: string,
    @Args('input') input: RecipeInput,
  ) {
    return this.adminRecipesService.create(authorId, input);
  }

  @Mutation(() => RecipeModel, { name: 'updateRecipe' })
  @Admin()
  update(@Args('id') id: string, @Args('input') input: RecipeInput) {
    return this.adminRecipesService.update(id, input);
  }

  @Mutation(() => RecipeModel, { name: 'deleteRecipeById' })
  @Admin()
  delete(@Args('id') id: string) {
    return this.adminRecipesService.delete(id);
  }
}
