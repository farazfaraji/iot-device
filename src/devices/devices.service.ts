import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { EventbusService } from '../common/services/eventbus/eventbus.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    protected readonly eventBus: EventbusService,
  ) {}
  async addNewDevice(deviceDto: Device) {
    const device = await this.deviceModel.create(deviceDto);
    await this.eventBus.newDeviceAdded(device);
  }
}
