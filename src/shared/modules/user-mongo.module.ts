import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdminRepo,
  Customer,
  customerSchema,
  SellerRepo,
  User,
  userSchema,
  CustomerRepo,
  Admin,
  adminSchema,
  Seller,
  sellerSchema,
} from '@models';
import { UserRepo } from 'src/models/common/user.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          { name: Customer.name, schema: customerSchema },
          { name: Admin.name, schema: adminSchema },
          { name: Seller.name, schema: sellerSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [SellerRepo, CustomerRepo, AdminRepo, UserRepo],
  exports: [SellerRepo, CustomerRepo, AdminRepo, UserRepo],
})
export class UserMongoModule {}
