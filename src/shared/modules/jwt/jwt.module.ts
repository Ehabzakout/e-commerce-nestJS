import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './jwt.service';

@Global()
@Module({
  providers: [JwtService, JwtToken, ConfigService],
  exports: [JwtService, JwtToken],
})
export class JwtModule {}
