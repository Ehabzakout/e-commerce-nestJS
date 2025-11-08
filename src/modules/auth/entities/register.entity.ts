import { Types } from 'mongoose';

export class CustomerEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
  otpExpiredAt: Date;
  isVerified: boolean;

  dob: Date;
}
