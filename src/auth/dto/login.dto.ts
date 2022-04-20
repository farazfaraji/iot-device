import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'faraz' })
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ example: '123@Faraz' })
  password: string;
}
