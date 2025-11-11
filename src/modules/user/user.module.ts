import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMongoModule } from '@shared/modules/user-mongo.module';

import { JwtModule } from '@shared/index';

@Module({
  imports: [UserMongoModule, JwtModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
