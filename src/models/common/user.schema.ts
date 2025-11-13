import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum USER_AGENT {
  'google' = 'google',
  'local' = 'local',
}
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

  @Prop({ type: String, enum: USER_AGENT, default: USER_AGENT.local })
  userAgent: USER_AGENT;

  @Prop({
    type: String,
    required: function (this: User) {
      return this.userAgent !== USER_AGENT.google;
    },
  })
  password: string;

  @Prop({ type: String, length: 5 })
  otp: string;

  @Prop({ type: Date })
  otpExpiredAt: Date;

  @Prop({
    type: Boolean,
    default: function (this: User) {
      return this.userAgent === USER_AGENT.google;
    },
  })
  isVerified: boolean;

  @Prop({ type: Date, default: Date.now() })
  credentialUpdatedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
