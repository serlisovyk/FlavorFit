import type { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RECIPE_NOT_FOUND_ERROR } from './recipes.constants';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: pagination, filtering (category, searchTerm (name, description), ingredients)
  // sorting (createdAt, recommended (likes), popularity (views))
  async getAll() {
    const data = await this.prisma.recipe.findMany({
      include: {
        comments: true,
        likes: true,
      },
    });

    // const likesCount = data.c;

    return data;
  }

  async getBySlug(slug: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { slug },
      include: {
        recipeSteps: true,
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
    });

    if (!recipe) throw new NotFoundException(RECIPE_NOT_FOUND_ERROR);

    return recipe;
  }
}
