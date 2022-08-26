import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Mensaje {
  @Column()
  grupo: string;

  @Column()
  de: string;

  @Column()
  para: string;

  @Column()
  asunto: string;

  @Column()
  prioridad: string;

  @Column()
  estado: string;
}
