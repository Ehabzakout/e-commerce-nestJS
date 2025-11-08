import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { RegisterFactory } from './factory/register.factory';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly registerFactory: RegisterFactory,
  ) {}
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const customer = await this.registerFactory.createCustomer(registerDTO);

    const createdCustomer = await this.authService.register(customer);

    return {
      message: 'Customer created successfully',
      success: true,
      createdCustomer,
    };
  }

  // @Post()
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
