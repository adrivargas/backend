import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  items: string[];

  @Prop({ required: true }) // ID del usuario en PostgreSQL
  userId: number;

  @Prop({ required: true }) // ID de la mesa en PostgreSQL
  tableId: number;

  @Prop({ required: true }) // ID del estado de orden en PostgreSQL
  statusId: number;

  @Prop({ required: true }) // ID del pago en PostgreSQL
  paymentId: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
