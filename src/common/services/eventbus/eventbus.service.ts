import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from '../../../users/users.service';
import { Device } from '../../../devices/schemas/device.schema';
import { GetUser } from '../../decorators/roles.decorator';
import { User } from '../../../users/schemas/user.schema';

@Injectable()
export class EventbusService {
  constructor(
    private eventEmitter: EventEmitter2,
    protected readonly userService: UsersService,
  ) {}

  async newDeviceAdded(device: Device, @GetUser() user?) {
    await this.userService.updateNewDevice(user, device);
  }
}
