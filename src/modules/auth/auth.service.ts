import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CustomerRepo } from '@models';
import { CustomerEntity } from './entities/register.entity';
import {
  compareText,
  expiryDate,
  generateOTP,
  sendEmail,
} from '@common/helpers';
import { SendOtpDTO, VerifyDTO } from './dto/verify.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtToken } from '@shared/modules/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepo: CustomerRepo,
    private jwtToken: JwtToken,
  ) {}

  // Register
  async register(customer: CustomerEntity) {
    // Check if user exists before
    const existed = await this.customerRepo.getOne({ email: customer.email });
    if (existed) throw new ConflictException('Email is already exist');

    // Create new user
    const newCustomer = await this.customerRepo.create(customer);

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
    const existedUser = await this.customerRepo.getOne({ email: verify.email });
    if (!existedUser) throw new NotFoundException("Can't found user");

    // Check on otp
    if (existedUser.otp !== verify.otp)
      throw new NotAcceptableException('invalid otp');
    if (new Date(existedUser.otpExpiredAt) < new Date(Date.now()))
      throw new ForbiddenException('Expired OTP');

    // Verify account in Database
    await this.customerRepo.updateOne(
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
    const existedUser = await this.customerRepo.getOneAndUpdate(
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
    const existedUser = await this.customerRepo.getOne({ email });
    const match = await compareText(password, existedUser?.password ?? '');

    // throw error for invalid data
    if (!existedUser)
      throw new UnauthorizedException('Invalid email or password');
    if (!match) throw new UnauthorizedException('Invalid email or password');

    // generate token
    const payload = {
      _id: existedUser._id,
      email: existedUser.email,
      role: 'Customer',
    };
    const token = this.jwtToken.generateToken(payload);
    return token;
  }
}
