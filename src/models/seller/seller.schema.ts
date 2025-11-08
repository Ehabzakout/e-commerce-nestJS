import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class Seller {
  readonly _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  @Prop({ type: String, length: 11, required: true })
  whatsApp: string;
}

export const sellerSchema = SchemaFactory.createForClass(Seller);
