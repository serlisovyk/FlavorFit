import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { RecipeInput } from './inputs/recipe.input'
import { RECIPE_NOT_FOUND_ERROR } from './recipes.constants'

@Injectable()
export class AdminRecipesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.recipe.findMany()
  }

  async getById(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    })

    if (!recipe) throw new NotFoundException(RECIPE_NOT_FOUND_ERROR)

    return recipe
  }

  create(
    authorId: string,
    { recipeSteps, nutritionFact, ingredients, tags, ...data }: RecipeInput,
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
        ...(!!ingredients?.length && {
          recipeIngredients: {
            // TODO: Update it after front-end start
            create: ingredients.map((ingredient, index) => ({
              ingredientId: ingredient.ingredientId,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
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
    })
  }

  async update(
    id: string,
    { recipeSteps, nutritionFact, ingredients, tags, ...data }: RecipeInput,
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
        ...(ingredients && {
          // TODO: Update it after front-end start
          recipeIngredients: {
            deleteMany: {},
            create: ingredients.map((ingredient, index) => ({
              ingredientId: ingredient.ingredientId,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
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
    })

    if (!recipe) throw new NotFoundException(RECIPE_NOT_FOUND_ERROR)

    return recipe
  }

  delete(id: string) {
    return this.prisma.recipe.delete({
      where: { id },
    })
  }
}
