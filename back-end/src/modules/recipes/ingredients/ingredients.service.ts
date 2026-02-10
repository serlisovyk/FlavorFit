import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  IngredientsCreateInput,
  IngredientsUpdateInput,
} from './inputs/ingredients.input';
import { INGREDIENT_NOT_FOUND_ERROR } from './ingredients.constants';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.ingredient.findMany();
  }

  async getById(id: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) throw new NotFoundException(INGREDIENT_NOT_FOUND_ERROR);

    return ingredient;
  }

  create(data: IngredientsCreateInput) {
    return this.prisma.ingredient.create({
      data,
    });
  }

  async update(id: string, data: IngredientsUpdateInput) {
    const ingredient = await this.prisma.ingredient.update({
      where: { id },
      data,
    });

    if (!ingredient) throw new NotFoundException(INGREDIENT_NOT_FOUND_ERROR);

    return ingredient;
  }

  delete(id: string) {
    return this.prisma.ingredient.delete({
      where: { id },
    });
  }
}
