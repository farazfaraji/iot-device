import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { NewUserDto } from './dto/new-user.dto';
import { LoginDto } from './dto/login.dto';
import { Successful } from '../common/types/successful.type';
import { Message } from '../common/enums/message.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.checkUsernamePassword(username, password);
  }

  async registerNewUser(newUserDto: NewUserDto): Promise<{ access_token }> {
    const user = await this.usersService.registerNewUser(newUserDto);
    return this.login(user);
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      roles: user.roles,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
