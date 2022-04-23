import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateDeviceException extends HttpException {
  constructor() {
    super('the device is already taken', HttpStatus.BAD_REQUEST);
  }
}
