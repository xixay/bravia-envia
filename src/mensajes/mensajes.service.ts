import { Injectable } from '@nestjs/common';
// import { connect } from 'amqplib';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import * as amqp from 'amqplib';
@Injectable()
export class MensajesService {
  async create(createMensajeDto: CreateMensajeDto) {
    try {
      enviar_sms_cola(createMensajeDto);
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
async function enviar_sms_cola(MensajeDto: CreateMensajeDto) {
  try {
    //luego conéctese al servidor RabbitMQ
    //const connection = await amqp.connect("amqp://localhost:5672");
    const coneccion = await amqp.connect('amqp://guest:guest@localhost:5672');
    //A continuación, creamos un canal, que es donde reside la mayor parte de la API para hacer las cosas:
    const canal = await coneccion.createChannel();
    //Para enviar, debemos declarar una cola para enviar a; entonces podemos publicar un mensaje en la cola:
    // const msg = 'Hello World!';
    const mensaje = JSON.stringify(MensajeDto);
    const cola = 'cola_de_sms';
    const mensajeBuffer = Buffer.from(mensaje);
    await canal.assertQueue(cola);
    await canal.sendToQueue(cola, mensajeBuffer);
    console.log(' [x] Enviado %s', mensaje);
    //Por último, cerramos el canal y la conexión y salimos:
    await canal.close();
    await coneccion.close();
  } catch (ex) {
    console.error(ex);
  }
}
