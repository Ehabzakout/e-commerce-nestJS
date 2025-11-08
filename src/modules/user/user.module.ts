import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMongoModule } from '@shared/modules/user-mongo.module';
import { JwtToken } from '@common/helpers/jwt';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserMongoModule],
  controllers: [UserController],
  providers: [UserService, JwtToken, JwtService],
})
export class UserModule {}
