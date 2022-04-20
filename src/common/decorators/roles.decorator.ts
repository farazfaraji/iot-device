import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { User } from '../../users/schemas/user.schema';

export const GetUser = createParamDecorator(
  (role: Role, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;
    if (role) {
      if (user.roles && user.roles.includes(role)) return user;
      throw new ForbiddenException();
    }
    return user;
  },
);
