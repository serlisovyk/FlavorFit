import { Query, Mutation, Resolver, Args } from '@nestjs/graphql'
import { Admin } from '@/modules/auth/decorators/admin.decorator'
import { IngredientModel } from './models/ingredient.model'
import {
  IngredientsCreateInput,
  IngredientsUpdateInput,
} from './inputs/ingredients.input'
import { IngredientsService } from './ingredients.service'

@Resolver()
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(() => [IngredientModel], {
    name: 'ingredients',
    description: 'Get all ingredients',
  })
  @Admin()
  getAll() {
    return this.ingredientsService.getAll()
  }

  @Query(() => IngredientModel, {
    name: 'ingredientById',
    description: 'Get ingredient by ID',
  })
  @Admin()
  getById(@Args('id') id: string) {
    return this.ingredientsService.getById(id)
  }

  @Mutation(() => IngredientModel, {
    name: 'createIngredient',
    description: 'Create a new ingredient',
  })
  @Admin()
  create(@Args('input') input: IngredientsCreateInput) {
    return this.ingredientsService.create(input)
  }

  @Mutation(() => IngredientModel, {
    name: 'updateIngredient',
    description: 'Update an existing ingredient',
  })
  @Admin()
  update(@Args('id') id: string, @Args('input') input: IngredientsUpdateInput) {
    return this.ingredientsService.update(id, input)
  }

  @Mutation(() => IngredientModel, {
    name: 'deleteIngredientById',
    description: 'Delete an ingredient by ID',
  })
  @Admin()
  delete(@Args('id') id: string) {
    return this.ingredientsService.delete(id)
  }
}
