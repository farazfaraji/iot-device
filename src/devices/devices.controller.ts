import { Controller, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('user/devices')
export class DevicesController {
  constructor(protected readonly devicesService: DevicesService) {}

  @Post()
  addNewDevice() {}
}
