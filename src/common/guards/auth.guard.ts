import { JwtToken } from '@shared/modules/jwt/jwt.service';
import { CustomerRepo } from '@models';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtToken: JwtToken,
    private customerRepo: CustomerRepo,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // if route is public
    const publicRole = this.reflector.get('PUBLIC', context.getHandler());
    if (publicRole) return true;

    // Check user auth
    const { authorization } = request.headers;
    if (!authorization) throw new UnauthorizedException('You should signin');

    const { _id, iat } = this.jwtToken.verifyToken(authorization.split(' ')[1]);

    const existedUser = await this.customerRepo.getOne({ _id: _id });

    if (!existedUser) throw new UnauthorizedException('You are not signin ');
    if (!existedUser.isVerified)
      throw new ForbiddenException('You should verify your account');
    if (new Date(existedUser.credentialUpdatedAt) > new Date(iat * 1000))
      throw new ForbiddenException('expired login');

    request.user = existedUser;
    return true;
  }
}
