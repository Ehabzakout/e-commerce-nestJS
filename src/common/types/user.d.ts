import { Types } from 'mongoose';

declare enum USER_ROLE {
  'Customer' = 'Customer',
  'Admin' = 'Admin',
  'Seller' = 'Seller',
}

declare type TUser = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  credentialUpdatedAt: Date;
  role: USER_ROLE;
  dob: Date;
};
