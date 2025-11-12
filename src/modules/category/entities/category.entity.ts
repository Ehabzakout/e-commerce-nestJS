import { Types } from 'mongoose';

export class CategoryEntity {
  name: string;
  slug: string;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}
