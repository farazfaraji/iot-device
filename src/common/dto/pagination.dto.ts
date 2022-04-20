import { IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsNumberString()
  @ApiProperty({ example: '0' })
  page: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ example: '10' })
  per_page = 10;
}
