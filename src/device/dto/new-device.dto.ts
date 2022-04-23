import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { DeviceType } from '../enums/devices.enum';

export class NewDeviceDto {
  @IsString()
  @ApiProperty({ example: 'string' })
  name: string;

  @IsUUID()
  @ApiProperty({ example: 'string' })
  uuid: string;

  @IsEnum(DeviceType)
  @ApiProperty({ enum: DeviceType, example: 'string' })
  type: DeviceType;

  // @IsMongoId()
  // @ApiProperty({ example: 'string' })
  // plantId: Plant;
}
