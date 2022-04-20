import { Logger } from '@nestjs/common';

export const LogMe =
  () =>
  (target: any, methodName: string, descriptor: any): void => {
    const className = target.constructor.name;
    const original = descriptor.value;
    const logger: Logger = new Logger();

    descriptor.value = new Proxy(original, {
      async apply(target, thisArg, args) {
        logger.debug(`[${className}] ${methodName}`, `${JSON.stringify(args)}`);

        return await target.apply(thisArg, args);
      },
    });
  };
