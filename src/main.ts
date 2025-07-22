// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      'https://casaempanadagigante.vercel.app', 
      'http://localhost:5173',                   
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
