import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //This is bad practice but works to our advantage for now, ohsp sec has a weird certificate
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.OHSP_PORT;
  await app.listen(port);
}
bootstrap();
