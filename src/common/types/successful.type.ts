import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../enums/status.enum';

export class Successful {
  @ApiProperty({ example: 'string' })
  message: string;

  @ApiProperty({ enum: Status })
  status: Status;
}
