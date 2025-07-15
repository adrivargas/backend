import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  items: any[]; // menú

  @Prop({ required: true })
  userId: number; // referencia a PostgreSQL

  @Prop({ required: true })
  statusId: number;

  @Prop({ required: true })
  paymentId: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}


export const OrderSchema = SchemaFactory.createForClass(Order);
