import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';

@Module({
  imports: [PrismaModule],
  providers: [IngredientsResolver, IngredientsService],
})
export class IngredientsModule {}
