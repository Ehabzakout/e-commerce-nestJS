import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true, trim: true })
  name: string;
  @Prop({ type: String, required: true, trim: true, unique: true })
  slug: string;
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Admin' })
  createdBy: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Admin' })
  updatedBy: Types.ObjectId;
}

export const categorySchema = SchemaFactory.createForClass(Category);
