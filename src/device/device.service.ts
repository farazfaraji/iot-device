import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { EventbusService } from '../common/services/eventbus/eventbus.service';
import { NewDeviceDto } from './dto/new-device.dto';
import { User } from '../users/schemas/user.schema';
import { Error } from '../common/enums/errors.enum';
import { DuplicateDeviceException } from './exceptions/duplicate-device.exception';
import { NewDeviceTypeManagerDto } from './dto/new-device-type.manager.dto';
import { DeviceList, DeviceListDocument } from './schemas/device-list.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(DeviceList.name)
    private deviceListModel: Model<DeviceListDocument>,
    protected readonly eventbusService: EventbusService,
  ) {}

  async getDeviceList() {
    return this.deviceListModel.find();
  }

  async addNewDeviceToList(newDeviceTypeManagerDto: NewDeviceTypeManagerDto) {
    return await this.deviceListModel.create(newDeviceTypeManagerDto);
  }

  async addNewDevice(user: User, newDeviceDto: NewDeviceDto) {
    let device;

    Object.assign(newDeviceDto, { userId: user.userId });

    try {
      device = await this.deviceModel.create(newDeviceDto);
    } catch (e: any) {
      if (e.code === Error.MONGO_DUPLICATE_DATA) {
        throw new DuplicateDeviceException();
      }
    }
    await this.eventbusService.newDeviceAdded(user, device);

    return device;
  }
}
