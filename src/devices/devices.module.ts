import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './schemas/device.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Device.name,
        useFactory: () => {
          const schema = DeviceSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [DevicesService],
  controllers: [DevicesController],
})
export class DevicesModule {}
