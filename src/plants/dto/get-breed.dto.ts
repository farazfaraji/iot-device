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

export class GetBreedDto {
  @IsMongoId()
  @IsString()
  @ApiProperty({ example: 'string' })
  plantId: string;

  @IsMongoId()
  @IsString()
  @ApiProperty({ example: 'string' })
  breedId: string;
}
