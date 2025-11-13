import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CustomerEntity } from './entities/register.entity';
import {
  compareText,
  expiryDate,
  generateOTP,
  hashText,
  sendEmail,
} from '@common/helpers';
import { SendOtpDTO, VerifyDTO } from './dto/verify.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtToken } from '@shared/modules/jwt/jwt.service';
import { UserRepo } from 'src/models/common/user.repo';
import { forgotPasswordDTO } from './dto/forgot-password.dto';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { CustomerRepo } from '@models';
import { RegisterFactory } from './factory/register.factory';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly customerRepo: CustomerRepo,
    private readonly registerFactory: RegisterFactory,
    private jwtToken: JwtToken,
    private configService: ConfigService,
  ) {}

  // Register
  async register(customer: CustomerEntity) {
    // Check if user exists before
    const existed = await this.userRepo.getOne({ email: customer.email });
    if (existed) throw new ConflictException('Email is already exist');

    // Create new user
    const newCustomer = await this.userRepo.create(customer);

    // Send verify Email with otp
    await sendEmail({
      to: newCustomer.email,
      subject: 'Confirm Email',
      html: `<p>Your OTP is: ${newCustomer.otp} </p>`,
    });

    // Remove sensitive data from response
    const { otp, otpExpiredAt, password, ...objCustomer } = JSON.parse(
      JSON.stringify(newCustomer),
    );

    return objCustomer;
  }

  // Verify Account
  async verifyAccount(verify: VerifyDTO) {
    // check existed user
    const existedUser = await this.userRepo.getOne({ email: verify.email });
    if (!existedUser) throw new NotFoundException("Can't found user");

    // Check on otp
    if (existedUser.otp !== verify.otp)
      throw new NotAcceptableException('invalid otp');
    if (new Date(existedUser.otpExpiredAt) < new Date(Date.now()))
      throw new ForbiddenException('Expired OTP');

    // Verify account in Database
    await this.userRepo.updateOne(
      { _id: existedUser._id },
      { $unset: { otp: '', otpExpiredAt: '' }, $set: { isVerified: true } },
    );

    // Send response
    return 'Your Account has been verified';
  }

  // Send OTP
  async sendOTP(sendOTP: SendOtpDTO) {
    const otp = generateOTP();
    const otpExpiredAt = expiryDate();

    // check existed user and update
    const existedUser = await this.userRepo.getOneAndUpdate(
      { email: sendOTP.email },
      { $set: { otp, otpExpiredAt } },
    );
    if (!existedUser) throw new NotFoundException("Can't found user");

    // Send Email
    await sendEmail({
      to: sendOTP.email,
      subject: 'Your New OTP',
      html: `Your new OTP is: <strong>${otp}</strong>`,
    });

    return 'Your OTP has been send successfully';
  }

  // Login
  async login({ email, password }: LoginDTO) {
    // check email and password
    const existedUser = await this.userRepo.getOne({ email });
    const match = await compareText(password, existedUser?.password ?? '');

    // throw error for invalid data
    if (!existedUser)
      throw new UnauthorizedException('Invalid email or password');
    if (!match) throw new UnauthorizedException('Invalid email or password');

    // generate token
    const payload = {
      _id: existedUser._id,
      email: existedUser.email,
    };
    const token = this.jwtToken.generateToken(payload);
    return token;
  }

  // Forget password
  async forgotPassword(forgotPasswordDTO: forgotPasswordDTO) {
    // check if user exist
    const existedUser = await this.userRepo.getOne({
      email: forgotPasswordDTO.email,
    });
    if (!existedUser) throw new NotFoundException("Can't found email");

    if (existedUser.otp !== forgotPasswordDTO.otp)
      throw new BadRequestException('Invalid OTP');

    if (existedUser.otpExpiredAt < new Date(Date.now()))
      throw new ForbiddenException('Expired Otp');

    // hash and update user password
    const newPassword = await hashText(forgotPasswordDTO.password);
    await this.userRepo.updateOne(
      { _id: existedUser._id },
      {
        password: newPassword,
        credentialUpdatedAt: Date.now(),
        $unset: { otp: '', otpExpiredAt: '' },
      },
    );

    return 'Your password updated successfully';
  }

  // Login and register by google
  async loginByGoogle(tokenId: string) {
    // Verify and get payload from google
    const client = new OAuth2Client(this.configService.get('client_id'));
    const ticket = await client.verifyIdToken({ idToken: tokenId });
    const payload = ticket.getPayload();

    // Check if user is exist if not register new user
    let existedUser = await this.userRepo.getOne({ email: payload?.email });
    if (!existedUser && payload) {
      const newUser = this.registerFactory.createCustomerByGoogle(payload);

      //@ts-expect-error
      existedUser = await this.customerRepo.create(newUser);
    }
    const token = this.jwtToken.generateToken({
      _id: existedUser?._id,
      email: existedUser?.email,
    });
    return token;
  }
}
