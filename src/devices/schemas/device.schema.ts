import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationSchema } from '../../common/schemas/location.schema';
import { LoobiyaSensor } from './sensors.schema';
import mongoose, { Document } from 'mongoose';
import { Plant } from '../../plants/schemas/plant.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop({ required: true })
  @ApiProperty({ example: 'string' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'string' })
  uuid: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'string' })
  type: string;

  @IsMongoId()
  @Prop({ ref: 'Plant', type: mongoose.Schema.Types.ObjectId, required: true })
  @ApiProperty({ example: 'string' })
  plantId: Plant;

  @Prop({ required: true })
  @ValidateNested({ each: true })
  @Type(() => LoobiyaSensor)
  sensorsData: LoobiyaSensor;

  @ValidateNested({ each: true })
  @Type(() => LocationSchema)
  location: LocationSchema;

  @Prop({ required: true })
  @ApiProperty({ example: '23' })
  lastSeen: number;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
