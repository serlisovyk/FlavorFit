import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { Admin } from '@/modules/auth/decorators/admin.decorator';
import { IngredientModel } from './models/ingredient.model';
import {
  IngredientsCreateInput,
  IngredientsUpdateInput,
} from './inputs/ingredients.input';
import { IngredientsService } from './ingredients.service';
import {
  GET_INGREDIENTS_QUERY_DESCRIPTION,
  GET_INGREDIENT_BY_ID_QUERY_DESCRIPTION,
  CREATE_INGREDIENT_MUTATION_DESCRIPTION,
  UPDATE_INGREDIENT_MUTATION_DESCRIPTION,
  DELETE_INGREDIENT_MUTATION_DESCRIPTION,
} from './ingredients.constants';

@Resolver()
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(() => [IngredientModel], {
    name: 'ingredients',
    description: GET_INGREDIENTS_QUERY_DESCRIPTION,
  })
  @Admin()
  getAll() {
    return this.ingredientsService.getAll();
  }

  @Query(() => IngredientModel, {
    name: 'ingredientById',
    description: GET_INGREDIENT_BY_ID_QUERY_DESCRIPTION,
  })
  @Admin()
  getById(@Args('id') id: string) {
    return this.ingredientsService.getById(id);
  }

  @Mutation(() => IngredientModel, {
    name: 'createIngredient',
    description: CREATE_INGREDIENT_MUTATION_DESCRIPTION,
  })
  @Admin()
  create(@Args('input') input: IngredientsCreateInput) {
    return this.ingredientsService.create(input);
  }

  @Mutation(() => IngredientModel, {
    name: 'updateIngredient',
    description: UPDATE_INGREDIENT_MUTATION_DESCRIPTION,
  })
  @Admin()
  update(@Args('id') id: string, @Args('input') input: IngredientsUpdateInput) {
    return this.ingredientsService.update(id, input);
  }

  @Mutation(() => IngredientModel, {
    name: 'deleteIngredientById',
    description: DELETE_INGREDIENT_MUTATION_DESCRIPTION,
  })
  @Admin()
  delete(@Args('id') id: string) {
    return this.ingredientsService.delete(id);
  }
}
