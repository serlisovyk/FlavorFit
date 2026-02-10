import { Injectable, NotFoundException } from '@nestjs/common';
import type { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/generated/prisma/client';
import type { RecipesQueryInput } from './inputs/recipes-query.input';
import { RECIPE_NOT_FOUND_ERROR } from './recipes.constants';
import type { RecipeSortOption } from './recipes.types';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll({ page, limit, searchTerm, sort }: RecipesQueryInput) {
    const skip = (page - 1) * limit;

    return this.prisma.recipe.findMany({
      skip,
      take: limit,
      orderBy: this.getOrderBy(sort),
      where: {
        ...(searchTerm && {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            {
              recipeIngredients: {
                some: {
                  ingredient: {
                    name: { contains: searchTerm, mode: 'insensitive' },
                  },
                },
              },
            },
          ],
        }),
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
    });
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

  private getOrderBy(sort?: RecipeSortOption) {
    switch (sort) {
      case 'recommended':
        return { likes: { _count: Prisma.SortOrder.desc } };
      case 'popular':
        return { views: Prisma.SortOrder.desc };
      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  }
}
