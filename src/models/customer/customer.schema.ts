import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: { virtuals: true },
})
export class Customer {
  readonly _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
  otpExpiredAt: Date;
  isVerified: boolean;
  credentialUpdatedAt: Date;
  @Prop({ type: Date })
  dob: Date;
}

export const customerSchema = SchemaFactory.createForClass(Customer);
