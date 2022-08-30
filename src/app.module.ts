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
