import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@common/guards/auth.guard';
import { Public, Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/role.guard';
import type { Request } from 'express';
import { User } from '@models';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
@Roles(['Admin', 'Customer'])
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Public()
  getUserInfo(@Req() req: Request & { user: User }) {
    return {
      message: 'Success',
      success: true,
      user: req.user,
    };
  }
}
