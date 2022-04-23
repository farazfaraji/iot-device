import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Device } from '../device/schemas/device.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserEventService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async updateNewDevice(user: User, deviceMetaData: Device) {
    await this.userModel.findByIdAndUpdate(user.userId, {
      $push: { devices: deviceMetaData },
    });
  }
}
