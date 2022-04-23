import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enum';
import { Plant } from '../../plants/schemas/plant.schema';
import { Device } from '../../device/schemas/device.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'string' })
  username: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Plant' })
  @ApiProperty({ example: 'plantId', isArray: true, required: true })
  favorites: Plant[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Device' })
  @ApiProperty({ example: 'deviceId', isArray: true, required: true })
  devices: Device[];

  @Prop({ default: [Role.User], required: true })
  roles: Role[];

  _id?: mongoose.Types.ObjectId;

  userId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
