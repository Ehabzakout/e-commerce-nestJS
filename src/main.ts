import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000, function () {
    console.log('Your app is running on port', process.env.PORT);
  });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
