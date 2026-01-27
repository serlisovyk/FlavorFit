import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });
  }

  async create(email: string, password: string) {
    return this.prisma.user.create({
      data: {
        email,
        password: await hash(password),
      },
    });
  }
}
