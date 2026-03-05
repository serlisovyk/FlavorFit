import { BadRequestException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { Prisma } from '@prisma/generated/client'
import { PrismaService } from '@/common/prisma/prisma.service'
import { ONE_HOUR_IN_MS, THIRTY_MINUTES_IN_MS } from '@/shared/constants'
import { UserUpdateInput } from './inputs/user-update.input'
import { USER_ALREADY_EXISTS_ERROR } from './users.constants'
import { CreateUserParams } from './users.types'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, measurements: true },
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    })
  }

  async findByEmailVerificationToken(token: string) {
    return this.prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          gt: new Date(),
        },
      },
    })
  }

  async markEmailAsVerified(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiresAt: null,
      },
    })
  }

  async setPasswordResetToken(id: string, token: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        resetPasswordToken: token,
        resetPasswordTokenExpiresAt: new Date(
          Date.now() + THIRTY_MINUTES_IN_MS,
        ),
      },
    })
  }

  async findByPasswordResetToken(token: string) {
    return this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpiresAt: {
          gt: new Date(),
        },
      },
    })
  }

  async updatePassword(id: string, newPassword: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: await hash(newPassword),
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
      },
    })
  }

  async create({ email, password, emailVerificationToken }: CreateUserParams) {
    const user = await this.findByEmail(email)

    if (user) throw new BadRequestException(USER_ALREADY_EXISTS_ERROR)

    return this.prisma.user.create({
      data: {
        email,
        password: await hash(password),
        emailVerificationToken,
        emailVerificationTokenExpiresAt: new Date(Date.now() + ONE_HOUR_IN_MS),
      },
    })
  }

  async updateProfile(id: string, input: UserUpdateInput) {
    const { profile, measurements, password, ...data } = input

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
      : {}

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
      : {}

    const hashedPassword =
      password && typeof password === 'string'
        ? {
            password: await hash(password),
          }
        : {}

    return this.prisma.user.update({
      where: { id },
      data: {
        ...hashedPassword,
        ...updateProfile,
        ...updateMeasurements,
        email: data.email,
        avatarUrl: data.avatarUrl,
      },
      include: { profile: true, measurements: true },
    })
  }
}
