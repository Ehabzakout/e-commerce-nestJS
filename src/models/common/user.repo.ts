import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepo } from '../abstract.repository';
import { User } from './user.schema';
import { Model } from 'mongoose';

export class UserRepo extends AbstractRepo<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }
}
