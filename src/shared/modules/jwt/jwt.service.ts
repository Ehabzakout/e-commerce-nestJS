import devEnv from '@config/dev.env';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtToken {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateToken(
    payload: any,
    options: JwtSignOptions = {
      expiresIn: '1d',
      secret: this.configService.get('jwt_secret'),
    },
  ) {
    return this.jwtService.sign(payload, options);
  }

  verifyToken(token: string, secret = this.configService.get('jwt_secret')) {
    return this.jwtService.verify(token, { secret });
  }
}
