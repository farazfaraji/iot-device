import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../common/enums/role.enum';
import { GetUser } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { DeviceService } from './device.service';
import { DeviceList } from './schemas/device-list.schema';
import { NewDeviceTypeManagerDto } from './dto/new-device-type.manager.dto';

@ApiTags('Device Manager')
@Controller('device/manager')
export class DeviceManagerController {
  constructor(protected readonly deviceService: DeviceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('device-type')
  @ApiResponse({ status: 200, type: DeviceList })
  async addNewDeviceToList(
    @GetUser(Role.Admin) user,
    @Body() newDeviceTypeManagerDto: NewDeviceTypeManagerDto,
  ): Promise<any> {
    return this.deviceService.addNewDeviceToList(newDeviceTypeManagerDto);
  }
}
