- npm i --save @nestjs/config
- agregar en main.ts
```ts
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

```
- crear .env
```
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_USERNAME=admin
DB_PASSWORD=admin
DB_DATABASE=devnote
DB_PORT =5432
```
- ir a package.json
```json
"scripts": {
    
    "start:dev": "NODE_ENV=development nest start --watch",
    
  },
```
- para agregar las ctes en otros lados  ir a app.module.ts
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesModule } from './mensajes/mensajes.module';
// agreagar para el env
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MensajesModule, ConfigModule.forRoot()], //agregar ConfigModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
- usar en mensajes.services.ts
```ts
const puerto = process.env.PORT;
```

- https://devnote.aprendekomodo.com/2020/08/configurar-env-para-nestjs.html