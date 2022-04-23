import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type DeviceListDocument = DeviceList & Document;

@Schema()
export class DeviceList {
  @Prop({ unique: true, required: true })
  @ApiProperty({ example: 'string' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'string' })
  description: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'string' })
  image: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'rl_' })
  prefix: string;
}

export const DeviceListSchema = SchemaFactory.createForClass(DeviceList);
