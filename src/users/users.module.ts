import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { hashPasswordHelper } from './helpers/hash-password.helper';
import { UsersController } from './users.controller';
import { UserPlantService } from './user.plant.service';
import { UsersEvent } from './users.event';

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
  providers: [UsersService, UserPlantService, UsersEvent],
  exports: [UsersService, UsersEvent],
  controllers: [UsersController],
})
export class UsersModule {}
