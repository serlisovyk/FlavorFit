import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { Admin } from '@/modules/auth/decorators/admin.decorator';
import { IngredientModel } from './models/ingredient.model';
import { IngredientCreateInput } from './inputs/create-ingredients.input';
import { IngredientUpdateInput } from './inputs/update-ingredients.input';
import { IngredientsService } from './ingredients.service';

@Resolver()
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(() => [IngredientModel], { name: 'ingredients' })
  @Admin()
  getAll() {
    return this.ingredientsService.getAll();
  }

  @Query(() => IngredientModel, { name: 'ingredientById' })
  @Admin()
  getById(@Args('id') id: string) {
    return this.ingredientsService.getById(id);
  }

  @Mutation(() => IngredientModel, { name: 'createIngredient' })
  @Admin()
  create(@Args('input') input: IngredientCreateInput) {
    return this.ingredientsService.create(input);
  }

  @Mutation(() => IngredientModel, { name: 'updateIngredient' })
  @Admin()
  update(@Args('id') id: string, @Args('input') input: IngredientUpdateInput) {
    return this.ingredientsService.update(id, input);
  }

  @Mutation(() => IngredientModel, { name: 'deleteIngredientById' })
  @Admin()
  delete(@Args('id') id: string) {
    return this.ingredientsService.delete(id);
  }
}
