import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsObject,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { Prop } from '@nestjs/mongoose';
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

export class NewBreedDto {
  @IsMongoId()
  @ApiProperty({ example: 'ObjectId' })
  plantId: string;

  @Exclude()
  _id = new mongoose.Types.ObjectId();

  @IsString()
  @ApiProperty({ example: 'string' })
  name: string;

  @IsArray()
  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ example: 'string' })
  explanation?: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => PlantNeeds)
  @ApiProperty({ type: PlantNeeds, isArray: true })
  needs: PlantNeeds;
}
