import { IsNumber, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoobiyaSensor {
  @IsNumber()
  @Max(100)
  @ApiProperty({ example: '100' })
  humidity: number;

  @IsNumber()
  @Max(100)
  @ApiProperty({ example: '100' })
  temperature: number;

  @IsNumber()
  @Max(100)
  @ApiProperty({ example: '100' })
  moisture: number;

  @IsNumber()
  @Max(100)
  @ApiProperty({ example: '100' })
  lux: number;
}
