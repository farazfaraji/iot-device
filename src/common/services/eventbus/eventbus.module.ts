import { Module } from '@nestjs/common';
import { EventbusService } from './eventbus.service';
import { UsersModule } from '../../../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [EventbusService],
  exports: [EventbusService],
})
export class EventbusModule {}
