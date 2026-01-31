import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { CORS_DOMAINS_ENV, PORT_ENV } from './shared/constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.enableCors({
    origin: configService.get<string>(CORS_DOMAINS_ENV)?.split(','),
    credentials: true,
  });

  app.disable('x-powered-by');

  const PORT = configService.getOrThrow<number>(PORT_ENV);

  await app.listen(PORT);
}

void bootstrap();
