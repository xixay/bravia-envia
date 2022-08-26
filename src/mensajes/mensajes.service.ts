import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
// import amqp from 'amqplib';
@Injectable()
export class MensajesService {
  async create(createMensajeDto: CreateMensajeDto) {
    try {
      //luego conéctese al servidor RabbitMQ
      //const connection = await amqp.connect("amqp://localhost:5672");
      const connection = await connect('amqp://guest:guest@localhost:5672');
      //A continuación, creamos un canal, que es donde reside la mayor parte de la API para hacer las cosas:
      const channel = await connection.createChannel();
      //Para enviar, debemos declarar una cola para enviar a; entonces podemos publicar un mensaje en la cola:
      const msg = 'Hello World!';
      const queue = 'mensaje';
      const msgBuffer = Buffer.from(msg);

      await channel.assertQueue(queue);
      await channel.sendToQueue(queue, msgBuffer);
      console.log(' [x] Enviado %s', msg);
      //Por último, cerramos el canal y la conexión y salimos:
      await channel.close();
      await connection.close();
    } catch (ex) {
      console.error(ex);
    }
    return createMensajeDto;
  }

  findAll() {
    return `This action returns all mensajes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mensaje`;
  }

  update(id: number, updateMensajeDto: UpdateMensajeDto) {
    return `This action updates a #${id} mensaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} mensaje`;
  }
}
