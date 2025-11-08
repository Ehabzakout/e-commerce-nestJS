import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserMongoModule } from '@shared/modules/user-mongo.module';
import { RegisterFactory } from './factory/register.factory';

import { JwtService } from '@nestjs/jwt';
import { JwtToken } from '@common/helpers/jwt';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService, RegisterFactory, JwtToken, JwtService],
})
export class AuthModule {}
