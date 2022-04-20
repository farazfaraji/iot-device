import { ApiProperty } from '@nestjs/swagger';

export class PlantNeeds {
  @ApiProperty({ example: '50' })
  humidity: number;

  @ApiProperty({ example: '50' })
  temperature: number;

  @ApiProperty({ example: '50' })
  moisture: number;

  @ApiProperty({ example: '50' })
  lux: number;
}

export class BreedDetail {
  @ApiProperty({ example: 'string' })
  name: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ type: PlantNeeds })
  plantNeeds: PlantNeeds;

  @ApiProperty({ example: 'string' })
  _id: string;
}

export class Breed {
  @ApiProperty({ example: 'string' })
  _id: string;

  @ApiProperty({ example: 'string' })
  name: string;

  @ApiProperty({ type: BreedDetail })
  breeds: BreedDetail[];
}
