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
import { SendOtpDTO, VerifyDTO } from './dto/verify.dto';
import { LoginDTO } from './dto/login.dto';
import { forgotPasswordDTO } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly registerFactory: RegisterFactory,
  ) {}

  // Register
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
  // verify account
  @Patch('verify-account')
  async verifyAccount(@Body() verifyDTO: VerifyDTO) {
    const message = await this.authService.verifyAccount(verifyDTO);
    return { message, success: true };
  }

  // Send OTP
  @Patch('send-otp')
  async sendOTP(@Body() sendOtpDTO: SendOtpDTO) {
    const message = await this.authService.sendOTP(sendOtpDTO);
    return { message, success: true };
  }

  // Login
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO);
    return { message: 'Logged in successfully', success: true, token };
  }

  @Patch('forgot-password')
  async forgotPassword(@Body() forgotPasswordDTO: forgotPasswordDTO) {
    const message = await this.authService.forgotPassword(forgotPasswordDTO);
    return { message, success: true };
  }

  @Post('login-by-google')
  async loginByGoogle(@Body('tokenId') tokenId) {
    const token = await this.authService.loginByGoogle(tokenId);
    return { message: 'logged in successfully', success: true, token };
  }
}
