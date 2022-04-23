import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { hashPasswordHelper } from './helpers/hash-password.helper';
import { UsersController } from './users.controller';
import { UserPlantService } from './user.plant.service';
import { UserEventService } from './user.event';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<User>('save', async function (next) {
            this.password = await hashPasswordHelper(this.password);
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService, UserPlantService, UserEventService],
  exports: [UsersService, UserEventService],
  controllers: [UsersController],
})
export class UsersModule {}
