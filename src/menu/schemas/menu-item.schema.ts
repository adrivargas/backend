import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuItemDocument = MenuItem & Document;

@Schema()
export class MenuItem {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], required: false })
  sizes?: string[];
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
