import type { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RECIPE_NOT_FOUND_ERROR } from './recipes.constants';
import type { RecipeInput } from './inputs/recipe.input';

@Injectable()
export class AdminRecipesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.recipe.findMany();
  }

  async getById(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) throw new NotFoundException(RECIPE_NOT_FOUND_ERROR);

    return recipe;
  }

  create(
    authorId: string,
    { recipeSteps, nutritionFact, ingredientsIds, tags, ...data }: RecipeInput,
  ) {
    return this.prisma.recipe.create({
      data: {
        ...data,
        author: { connect: { id: authorId } },
        ...(!!nutritionFact && {
          nutritionFact: {
            create: nutritionFact,
          },
        }),
        recipeSteps: {
          create: recipeSteps,
        },
        ...(!!ingredientsIds?.length && {
          recipeIngredients: {
            // TODO: Update it after front-end start
            create: ingredientsIds.map((ingredientId, index) => ({
              ingredientId,
              quantity: 1,
              order: index,
            })),
          },
        }),
        ...(!!tags?.length && {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        }),
      },
    });
  }

  async update(
    id: string,
    { recipeSteps, nutritionFact, ingredientsIds, tags, ...data }: RecipeInput,
  ) {
    const recipe = await this.prisma.recipe.update({
      where: { id },
      data: {
        ...data,
        ...(nutritionFact && {
          nutritionFact: {
            upsert: {
              create: nutritionFact,
              update: nutritionFact,
            },
          },
        }),
        ...(recipeSteps && {
          recipeSteps: {
            deleteMany: {},
            create: recipeSteps.map((step) => ({
              order: step.order,
              title: step.title,
              description: step.description,
            })),
          },
        }),
        ...(ingredientsIds && {
          // TODO: Update it after front-end start
          recipeIngredients: {
            deleteMany: {},
            create: ingredientsIds.map((ingredientId, index) => ({
              ingredientId,
              quantity: 1,
              order: index,
            })),
          },
        }),
        ...(tags && {
          tags: {
            set: [],
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        }),
      },
    });

    if (!recipe) throw new NotFoundException(RECIPE_NOT_FOUND_ERROR);

    return recipe;
  }

  delete(id: string) {
    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}
