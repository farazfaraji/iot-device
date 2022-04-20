import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * @decorator
 * @description A custom decorator to validate a validation-schema within a validation schema upload N levels
 * @param schema The validation Class
 * @param validationOptions
 */
export function ValidateNested(
  schema: new () => any,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-dto
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ValidateNested',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return false;
          }
          args.value;
          if (Array.isArray(value)) {
            for (let i = 0; i < (<Array<any>>value).length; i++) {
              if (validateSync(plainToClass(schema, value[i])).length) {
                return false;
              }
            }
            return true;
          } else return !validateSync(plainToClass(schema, value)).length;
        },
        defaultMessage(args: ValidationArguments) {
          if (!args.value) {
            return '';
          } else if (Array.isArray(args.value)) {
            for (let i = 0; i < (<Array<any>>args.value).length; i++) {
              return (`${args.property}::index${i} -> ` +
                validateSync(plainToClass(schema, args.value[i]))
                  .map((e) => e.constraints!)
                  .reduce(
                    (acc: string[], next) => acc.concat(Object.values(next)),
                    [],
                  ))!.toString();
            }
            return '';
          } else
            return (`${args.property}: ` +
              validateSync(plainToClass(schema, args.value))
                .map((e) => e.constraints!)
                .reduce(
                  (acc: string[], next) => acc.concat(Object.values(next)),
                  [],
                ))!.toString();
        },
      },
    });
  };
}
