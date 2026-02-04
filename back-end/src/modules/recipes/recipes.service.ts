import type { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RECIPE_NOT_FOUND_ERROR } from './recipes.constants';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: pagination, filtering (category, searchTerm (name, description), ingredients)
  // sorting (createdAt, recommended (likes), popularity (views))
  getAll() {
    return this.prisma.recipe.findMany();
  }

  async getBySlug(slug: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { slug },
      include: { recipeSteps: true, recipeIngredients: true },
    });

    if (!recipe) throw new NotFoundException(RECIPE_NOT_FOUND_ERROR);

    return recipe;
  }
}
