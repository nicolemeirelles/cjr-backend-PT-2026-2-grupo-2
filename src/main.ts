import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Valida automaticamente todos os DTOs (class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que nao estao no DTO
      forbidNonWhitelisted: true, // retorna erro se mandarem campos extras
      transform: true, // converte o body/params para os tipos do DTO
    }),
  );

  // Permite que o front (Next.js) chame a API
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  });

  // Porta 3001 para nao conflitar com o front, que usa a 3000
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`API rodando em http://localhost:${port}`);
}
void bootstrap();
