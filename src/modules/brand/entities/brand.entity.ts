import { Types } from 'mongoose';

export class BrandEntity {
  name: string;
  slug: string;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}
