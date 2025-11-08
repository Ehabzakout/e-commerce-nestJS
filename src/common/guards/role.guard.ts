import { Roles } from '@common/decorators/roles.decorator';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const publicRole = this.reflector.get('PUBLIC', context.getHandler());
    if (publicRole) return true;
    const roles = this.reflector.getAllAndMerge(Roles, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!roles.includes(request.user.role))
      throw new ForbiddenException('Unauthorized');
    return true;
  }
}
