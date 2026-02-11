import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/generated/client';
import { PrismaService } from '@/prisma/prisma.service';
import { RecipesQueryInput } from './inputs/recipes-query.input';
import { RECIPE_NOT_FOUND_ERROR } from './recipes.constants';
import { RECIPE_SORT_OPTIONS } from './recipes.types';

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

  private getOrderBy(sort?: RECIPE_SORT_OPTIONS) {
    switch (sort) {
      case RECIPE_SORT_OPTIONS.RECOMMENDED:
        return { likes: { _count: Prisma.SortOrder.desc } };
      case RECIPE_SORT_OPTIONS.POPULAR:
        return { views: Prisma.SortOrder.desc };
      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  }
}
