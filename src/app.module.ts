import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesModule } from './mensajes/mensajes.module';

@Module({
  imports: [MensajesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
