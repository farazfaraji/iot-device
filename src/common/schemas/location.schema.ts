import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class LocationSchema {
  @Prop({ type: String, required: true, enum: ['Point'] })
  @ApiProperty({ example: 'Point' })
  type: string;

  @ApiProperty({ example: [Number], isArray: true })
  @Prop({ type: [Number], required: true })
  coordinates: [];
}
