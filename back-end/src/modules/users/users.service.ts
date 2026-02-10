import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import type { Prisma } from '@prisma/generated/prisma/client';
import type { PrismaService } from '@/prisma/prisma.service';
import { UserUpdateInput } from './inputs/user-update.input';
import { USER_ALREADY_EXISTS_ERROR } from './users.constants';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, measurements: true },
    });
  }

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
    const user = await this.findByEmail(email);

    if (user) throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);

    return this.prisma.user.create({
      data: {
        email,
        password: await hash(password),
      },
    });
  }

  async updateProfile(id: string, input: UserUpdateInput) {
    const { profile, measurements, password, ...data } = input;

    const updateProfile: Prisma.XOR<
      Prisma.UserUpdateInput,
      Prisma.UserUncheckedUpdateInput
    > = profile
      ? {
          profile: {
            upsert: {
              create: profile as Prisma.ProfileCreateWithoutUserInput,
              update: profile as Prisma.ProfileUpdateWithoutUserInput,
            },
          },
        }
      : {};

    const updateMeasurements: Prisma.XOR<
      Prisma.UserUpdateInput,
      Prisma.UserUncheckedUpdateInput
    > = measurements
      ? {
          measurements: {
            upsert: {
              create: measurements,
              update: measurements,
            },
          },
        }
      : {};

    const hashedPassword =
      password && typeof password === 'string'
        ? {
            password: await hash(password),
          }
        : {};

    return this.prisma.user.update({
      where: { id },
      data: {
        ...hashedPassword,
        ...updateProfile,
        ...updateMeasurements,
        email: data.email,
      },
      include: { profile: true, measurements: true },
    });
  }
}
