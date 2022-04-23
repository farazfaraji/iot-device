import { BadRequestException, Injectable } from '@nestjs/common';
import { NewUserDto } from './dto/new-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Error } from '../common/enums/errors.enum';
import { DuplicateUserException } from './exceptions/duplicate-user.exception';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Successful } from '../common/types/successful.type';
import { Message } from '../common/enums/message.enum';
import { Status } from '../common/enums/status.enum';
import { hashPasswordHelper } from './helpers/hash-password.helper';
import { ExcludeObjectDto } from './dto/exclude-object.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async me(user: User, excludeFields: ExcludeObjectDto) {
    let excludeText = '';
    for (let i = 0; i < excludeFields.excludes.length; i++) {
      excludeText += ' -' + excludeFields.excludes[i];
    }
    return this.userModel
      .findById(user.userId)
      .select('-password' + excludeText)
      .populate('devices')
      .exec();
  }

  async registerNewUser(newUserDto: NewUserDto): Promise<UserDocument> {
    try {
      return await this.userModel.create(newUserDto);
    } catch (e: any) {
      if (e.code === Error.MONGO_DUPLICATE_DATA)
        throw new DuplicateUserException();
    }
  }

  async checkUsernamePassword(
    username: string,
    password: string,
  ): Promise<User | boolean> {
    const user = await this.userModel.findOne({ username });
    if (user) {
      if (await bcrypt.compare(password, user.password)) return user;
    }
    return false;
  }

  async changePassword(
    user: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<Successful> {
    const userDocument = await this.userModel.findByIdAndUpdate(user.userId, {
      password: await hashPasswordHelper(changePasswordDto.new_password),
    });
    if (userDocument)
      return { message: Message.SUCCESSFUL_CHANGE_PASSWORD, status: Status.OK };
    throw new BadRequestException();
  }
}
