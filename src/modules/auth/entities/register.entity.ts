import { USER_AGENT } from '@models';
import { Types } from 'mongoose';

export class CustomerEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
  otpExpiredAt: Date;
  isVerified: boolean;
  credentialUpdatedAt: Date;
  dob: Date;
  userAgent: USER_AGENT;
}

export class CustomerByGoogle {
  firstName: string;
  lastName: string;
  email: string;

  isVerified: boolean;
  credentialUpdatedAt: Date;

  userAgent: USER_AGENT;
}
