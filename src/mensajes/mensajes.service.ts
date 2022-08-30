import { Injectable } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import * as amqp from 'amqplib';
@Injectable()
export class MensajesService {
  async create(createMensajeDto: CreateMensajeDto) {
    try {
      enviar_sms_cola(createMensajeDto);
      // enviar_cola_tarea(createMensajeDto);
    } catch (ex) {
      console.error(ex);
    }
    // return createMensajeDto;
    const puerto = process.env.PORT;
    console.log('#####PUERTO', puerto);
    return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DB_HOST: process.env.DB_HOST,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_DATABASE: process.env.DB_DATABASE,
      DB_PORT: process.env.DB_PORT,
    };
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
async function enviar_sms_cola(MensajeDto: CreateMensajeDto) {
  try {
    //luego conéctese al servidor RabbitMQ
    //const connection = await amqp.connect("amqp://localhost:5672");
    const coneccion = await amqp.connect('amqp://guest:guest@localhost:5672');
    //A continuación, creamos un canal, que es donde reside la mayor parte de la API para hacer las cosas:
    const canal = await coneccion.createChannel();
    //Para enviar, debemos declarar una cola para enviar a; entonces podemos publicar un mensaje en la cola:
    const mensaje = JSON.stringify(MensajeDto);
    const cola = 'cola_de_sms';
    const mensajeBuffer = Buffer.from(mensaje);
    await canal.assertQueue(cola, {
      durable: true,
    });
    await canal.sendToQueue(cola, mensajeBuffer);
    console.log(' [x] Enviado %s', mensaje),
      {
        persistent: true,
      };
    //Por último, cerramos el canal y la conexión y salimos:
    await canal.close();
    await coneccion.close();
  } catch (ex) {
    console.error(ex);
  }
}
