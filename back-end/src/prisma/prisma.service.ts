import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/generated/prisma/client';
import { DATABASE_URL_ENV } from './prisma.constants';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly configService: ConfigService) {
    const connectionString = configService.getOrThrow<string>(DATABASE_URL_ENV);

    const adapter = new PrismaPg({ connectionString });

    super({ adapter });
  }
}
