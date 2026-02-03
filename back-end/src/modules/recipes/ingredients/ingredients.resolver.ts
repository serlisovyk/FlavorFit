import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { ROLE } from '@prisma/generated/graphql/prisma';
import { Auth } from '@/modules/auth/decorators/auth.decorator';
import { IngredientModel } from './models/ingredient.model';
import { IngredientCreateInput } from './inputs/create-ingredients.input';
import { IngredientUpdateInput } from './inputs/update-ingredients.input';
import { IngredientsService } from './ingredients.service';

@Resolver()
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(() => [IngredientModel], { name: 'ingredients' })
  @Auth(ROLE.ADMIN)
  getAll() {
    return this.ingredientsService.getAll();
  }

  @Query(() => IngredientModel, { name: 'ingredientById' })
  @Auth(ROLE.ADMIN)
  getById(@Args('id') id: string) {
    return this.ingredientsService.getById(id);
  }

  @Mutation(() => IngredientModel, { name: 'createIngredient' })
  @Auth(ROLE.ADMIN)
  create(@Args('input') input: IngredientCreateInput) {
    return this.ingredientsService.create(input);
  }

  @Mutation(() => IngredientModel, { name: 'updateIngredient' })
  @Auth(ROLE.ADMIN)
  update(@Args('id') id: string, @Args('input') input: IngredientUpdateInput) {
    return this.ingredientsService.update(id, input);
  }

  @Mutation(() => IngredientModel, { name: 'deleteIngredientById' })
  @Auth(ROLE.ADMIN)
  delete(@Args('id') id: string) {
    return this.ingredientsService.delete(id);
  }
}
