import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from './common/config/configuration.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/plants.module';
import { DeviceModule } from './device/device.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventbusModule } from './common/services/eventbus/eventbus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('mongodb'),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    PlantsModule,
    DeviceModule,
    EventbusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
