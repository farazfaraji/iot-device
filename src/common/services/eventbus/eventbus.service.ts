import { Injectable } from '@nestjs/common';
import { Device } from '../../../device/schemas/device.schema';
import { User } from '../../../users/schemas/user.schema';
import { UserEventService } from '../../../users/user.event';

@Injectable()
export class EventbusService {
  constructor(
    //private eventEmitter: EventEmitter2,
    protected readonly userEventService: UserEventService,
  ) {}

  async newDeviceAdded(user: User, device: Device) {
    await this.userEventService.updateNewDevice(user, device);
  }
}
