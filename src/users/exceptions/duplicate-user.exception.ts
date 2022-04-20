import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateUserException extends HttpException {
  constructor() {
    super('username is already exist', HttpStatus.BAD_REQUEST);
  }
}
