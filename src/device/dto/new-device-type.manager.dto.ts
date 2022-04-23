import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class NewDeviceTypeManagerDto {
  @IsString()
  @ApiProperty({ example: 'string' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'string' })
  description: string;

  @IsUrl()
  @ApiProperty({ example: 'string' })
  image: string;

  @IsString()
  @ApiProperty({ example: 'string' })
  prefix: string;
}
