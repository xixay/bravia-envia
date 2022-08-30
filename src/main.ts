import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// agregar config
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // agregar el config service
  const configService = app.get(ConfigService);
  // agregar el puerto
  const port = configService.get('PORT');
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(port); // usar el puerto
}
bootstrap();
