import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './schemas/device.schema';
import { EventbusModule } from '../common/services/eventbus/eventbus.module';
import { DeviceManagerController } from './device.manager.controller';
import { DeviceList, DeviceListSchema } from './schemas/device-list.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Device.name,
        useFactory: () => {
          return DeviceSchema;
        },
      },
      {
        name: DeviceList.name,
        useFactory: () => {
          return DeviceListSchema;
        },
      },
    ]),
    EventbusModule,
  ],
  providers: [DeviceService],
  controllers: [DeviceController, DeviceManagerController],
})
export class DeviceModule {}
