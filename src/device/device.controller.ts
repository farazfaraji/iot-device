import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { GetUser } from '../common/decorators/roles.decorator';
import { NewDeviceDto } from './dto/new-device.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '../users/schemas/user.schema';
import { DeviceList } from './schemas/device-list.schema';

@Controller('device')
export class DeviceController {
  constructor(protected readonly devicesService: DeviceService) {}

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, isArray: true, type: DeviceList })
  async getDeviceList() {
    return await this.devicesService.getDeviceList();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: User })
  async addNewDevice(@GetUser() user, @Body() newDeviceDto: NewDeviceDto) {
    return await this.devicesService.addNewDevice(user, newDeviceDto);
  }
}
