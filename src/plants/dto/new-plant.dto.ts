import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export class PlantNeeds {
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

export class NewPlantDto {
  @IsString()
  @ApiProperty({ example: 'string' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'string' })
  explanation: string;

  @IsArray()
  @ApiProperty({ type: [String] })
  images: string[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => PlantNeeds)
  @ApiProperty({ type: PlantNeeds, isArray: true })
  needs: PlantNeeds;

  addedBy: mongoose.Types.ObjectId;
}
