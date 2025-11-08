import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserMongoModule } from '@shared/modules/user-mongo.module';
import { RegisterFactory } from './factory/register.factory';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService, RegisterFactory],
})
export class AuthModule {}
