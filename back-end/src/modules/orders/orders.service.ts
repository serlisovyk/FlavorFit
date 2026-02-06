import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { PrismaService } from '@/prisma/prisma.service';
import type { OrderCreateInput } from './inputs/order.input';
import {
  ORDER_EMPTY_ERROR,
  RECIPE_INGREDIENT_NOT_FOUND_ERROR,
} from './orders.constants';
import { ORDER_STATUS } from './enums/order.enums';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  getAllByUserId(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            recipeIngredient: {
              include: { recipe: true, ingredient: true },
            },
          },
        },
      },
    });
  }

  async makeOrder(userId: string, input: OrderCreateInput) {
    if (!input.items.length) {
      throw new BadRequestException(ORDER_EMPTY_ERROR);
    }

    const generatedOrderId = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const recipeIngredientsIds = input.items.map(
      (item) => item.recipeIngredientId,
    );

    const recipeIngredients = await this.prisma.recipeIngredient.findMany({
      where: { id: { in: recipeIngredientsIds } },
      include: { ingredient: true },
    });

    const ingredientsMap = new Map(recipeIngredients.map((ri) => [ri.id, ri]));

    let total = 0;

    const itemsWithPrice = input.items.map((item) => {
      const recipeIngredient = ingredientsMap.get(item.recipeIngredientId);

      if (!recipeIngredient) {
        throw new NotFoundException(RECIPE_INGREDIENT_NOT_FOUND_ERROR);
      }

      const price = Number(recipeIngredient.ingredient.price) || 0;
      const itemPrice = price * item.quantity;

      total += itemPrice;

      return {
        recipeIngredientId: item.recipeIngredientId,
        quantity: item.quantity,
        price: itemPrice,
      };
    });

    return this.prisma.order.create({
      data: {
        orderId: generatedOrderId,
        userId,
        status: ORDER_STATUS.PENDING,
        total,
        items: {
          create: itemsWithPrice,
        },
      },
      include: {
        items: {
          include: {
            recipeIngredient: {
              include: { ingredient: true },
            },
          },
        },
      },
    });
  }
}
