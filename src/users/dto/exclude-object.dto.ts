import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExcludeObjectDto {
  @IsOptional()
  @IsArray()
  @ApiProperty({ isArray: true, example: 'favorites' })
  excludes: string[];
}
