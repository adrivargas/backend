import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // efectivo, tarjeta, etc.

  @Column({ nullable: true })
  transactionCode?: string;
}
