import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationSchema } from '../../common/schemas/location.schema';
import { LoobiyaSensor } from './devices/loobiya-sensors.schema';
import mongoose, { Document } from 'mongoose';
import { Plant } from '../../plants/schemas/plant.schema';
import { User } from '../../users/schemas/user.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop({ required: true })
  @ApiProperty({ example: 'string' })
  name: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'string' })
  uuid: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'string' })
  type: string;

  @IsMongoId()
  @Prop({ ref: 'Plant', type: mongoose.Schema.Types.ObjectId, required: true })
  @ApiProperty({ example: 'string' })
  plantId: Plant;

  @IsMongoId()
  @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true })
  @ApiProperty({ example: 'string' })
  userId: User;

  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => LoobiyaSensor)
  sensorsData?: LoobiyaSensor;

  @Prop({ required: false })
  @ValidateNested({ each: true })
  @Type(() => LocationSchema)
  location?: LocationSchema;

  @Prop({ required: false })
  @ApiProperty({ example: '23' })
  lastSeen?: number;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
