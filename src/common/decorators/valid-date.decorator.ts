import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,

      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { from, to } = args.object as any;
          if (new Date(from) < new Date(Date.now())) return false;
          if (new Date(from) > new Date(to)) return false;
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const { from, to } = args.object as any;

          if (new Date(from) > new Date(to))
            return 'Start date should be less than end date';
          if (new Date(from) < new Date(Date.now()))
            return 'Start Time should be larger than now';

          return 'Invalid Date';
        },
      },
    });
  };
}
