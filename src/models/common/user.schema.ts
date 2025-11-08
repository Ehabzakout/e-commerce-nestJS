import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  discriminatorKey: 'role',
})
export class User {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, length: 5 })
  otp: string;

  @Prop({ type: Date })
  otpExpiredAt: Date;

  @Prop({ type: Boolean })
  isVerified: boolean;

  @Prop({ type: Date, default: Date.now() })
  credentialUpdatedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
