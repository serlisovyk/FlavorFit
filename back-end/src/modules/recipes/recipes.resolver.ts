import { Resolver } from '@nestjs/graphql';
import { RecipesService } from './recipes.service';

@Resolver()
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  // @Query(() => [IngredientModel], { name: 'ingredients' })
  // @Admin()
  // getAll() {
  //   return this.recipesService.getAll();
  // }

  // @Query(() => IngredientModel, { name: 'ingredientById' })
  // @Admin()
  // getById(@Args('id') id: string) {
  //   return this.recipesService.getById(id);
  // }

  // @Mutation(() => IngredientModel, { name: 'createIngredient' })
  // @Admin()
  // create(@Args('input') input: IngredientCreateInput) {
  //   return this.recipesService.create(input);
  // }

  // @Mutation(() => IngredientModel, { name: 'updateIngredient' })
  // @Admin()
  // update(@Args('id') id: string, @Args('input') input: IngredientUpdateInput) {
  //   return this.recipesService.update(id, input);
  // }

  // @Mutation(() => IngredientModel, { name: 'deleteIngredientById' })
  // @Admin()
  // delete(@Args('id') id: string) {
  //   return this.recipesService.delete(id);
  // }
}
