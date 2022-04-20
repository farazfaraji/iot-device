import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToFavoriteDto {
  @IsMongoId()
  @ApiProperty({ example: 'ObjectId' })
  plantId: string;
}
