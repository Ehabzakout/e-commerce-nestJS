import { ConflictException, Injectable } from '@nestjs/common';

import { CustomerRepo } from '@models';
import { CustomerEntity } from './entities/register.entity';
import { sendEmail } from '@common/helpers';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepo: CustomerRepo) {}
  async register(customer: CustomerEntity) {
    const existed = await this.customerRepo.getOne({ email: customer.email });
    if (existed) throw new ConflictException('Email is already exist');

    const newCustomer = await this.customerRepo.create(customer);
    await sendEmail({
      to: newCustomer.email,
      subject: 'Confirm Email',
      html: `<p>Your OTP is: ${newCustomer.otp} </p>`,
    });
    const { otp, otpExpiredAt, password, ...objCustomer } = JSON.parse(
      JSON.stringify(newCustomer),
    );
    return objCustomer;
  }
}
