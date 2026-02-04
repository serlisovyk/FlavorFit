import type { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RECIPE_NOT_FOUND_ERROR } from './recipes.constants';

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

  // create(data: RecipeCreateInput) {
  //   return this.prisma.recipe.create({
  //     data,
  //   });
  // }

  // async update(id: string, data: RecipeUpdateInput) {
  //   const recipe = await this.prisma.recipe.update({
  //     where: { id },
  //     data,
  //   });

  //   if (!recipe) throw new NotFoundException(RECIPE_NOT_FOUND_ERROR);

  //   return recipe;
  // }

  delete(id: string) {
    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}
