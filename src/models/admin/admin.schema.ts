import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class Admin {
  readonly _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const adminSchema = SchemaFactory.createForClass(Admin);
