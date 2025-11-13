import { hashText } from '@common/helpers';
import { RegisterDTO } from '../dto/register.dto';
import { CustomerByGoogle, CustomerEntity } from '../entities/register.entity';
import { expiryDate, generateOTP } from '@common/helpers';
import { Injectable } from '@nestjs/common';
import { USER_AGENT } from '@models';
import { TokenPayload } from 'google-auth-library';

@Injectable()
export class RegisterFactory {
  async createCustomer(registerDTO: RegisterDTO) {
    const customer = new CustomerEntity();
    customer.email = registerDTO.email;
    customer.firstName = registerDTO.firstName;
    customer.lastName = registerDTO.lastName;
    customer.password = await hashText(registerDTO.password);
    customer.otp = generateOTP();
    customer.otpExpiredAt = expiryDate();
    customer.isVerified = false;
    customer.dob = registerDTO.dob;
    customer.credentialUpdatedAt = new Date(Date.now());
    customer.userAgent = USER_AGENT.local;
    return customer;
  }
  createCustomerByGoogle(user: TokenPayload) {
    const customer = new CustomerByGoogle();
    customer.email = user.email!;
    customer.firstName = user.given_name!;
    customer.lastName = user.family_name!;
    customer.credentialUpdatedAt = new Date();
    customer.userAgent = USER_AGENT.google;
    customer.isVerified = true;
    return customer;
  }
}
