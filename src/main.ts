import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilita CORS para Netlify (producción) y localhost (desarrollo)
  app.enableCors({
    origin: [
      'https://casaempanadagigante.netlify.app', // producción
      'http://localhost:5173',                   // desarrollo
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
