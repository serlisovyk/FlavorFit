import { Module } from '@nestjs/common';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ReactionModule } from './reaction/reaction.module';
import { AdminRecipesService } from './admin-recipes.service';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';

@Module({
  providers: [RecipesResolver, RecipesService, AdminRecipesService],
  imports: [IngredientsModule, ReactionModule],
})
export class RecipesModule {}
