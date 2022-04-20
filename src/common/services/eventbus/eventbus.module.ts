import { Module } from '@nestjs/common';
import { UsersService } from '../../../users/users.service';
import { EventbusService } from './eventbus.service';

@Module({})
export class EventbusModule {
  imports: [UsersService];
  providers: [EventbusService];
  exports: [EventbusService];
}
