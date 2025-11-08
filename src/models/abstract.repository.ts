import {
  Model,
  MongooseUpdateQueryOptions,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  UpdateQuery,
} from 'mongoose';

export class AbstractRepo<T> {
  constructor(protected model: Model<T>) {}

  async create(item: Partial<T>) {
    return await this.model.create(item);
  }

  async getOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return await this.model.findOne(filter, projection, options);
  }

  async getMany(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return await this.model.find(filter, projection, options);
  }

  async updateOne(
    filter: RootFilterQuery<T>,
    update: UpdateQuery<T>,
    options: MongooseUpdateQueryOptions<T>,
  ) {
    return await this.model.updateOne(filter, update, options);
  }
}
