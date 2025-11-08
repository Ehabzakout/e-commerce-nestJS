import { hashText } from '@common/helpers';
import { RegisterDTO } from '../dto/register.dto';
import { CustomerEntity } from '../entities/register.entity';
import { expiryDate, generateOTP } from '@common/helpers';
import { Injectable } from '@nestjs/common';

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

    return customer;
  }
}
