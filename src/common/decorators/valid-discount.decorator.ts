import { DISCOUNT_TYPE } from '@models';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidDiscount(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidDiscount',
      target: object.constructor,
      propertyName: propertyName,

      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { discountType } = obj;
          if (discountType === DISCOUNT_TYPE.percentage)
            return typeof value === 'number' && value >= 0 && value <= 100;
          if (discountType === DISCOUNT_TYPE.fixedAmount)
            return typeof value === 'number' && value > 0;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const { discountType } = obj;
          if (discountType === DISCOUNT_TYPE.percentage)
            return 'Discount amount it should be between 0 and 100 ';
          if (discountType === DISCOUNT_TYPE.fixedAmount)
            return 'discount amount should be a number and larger than 0';
          return 'Invalid discount amount';
        },
      },
    });
  };
}
