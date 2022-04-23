import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Successful } from '../common/types/successful.type';
import { SwaggerHeaderDecorator } from '../common/decorators/swagger-header.decorator';
import { GetUser } from '../common/decorators/roles.decorator';
import { UserPlantService } from './user.plant.service';
import { AddToFavoriteDto } from './dto/add-to-favorite.dto';
import { Plant } from '../plants/schemas/plant.schema';
import { ExcludeObjectDto } from './dto/exclude-object.dto';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(
    protected readonly userService: UsersService,
    protected readonly userPlantService: UserPlantService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiResponse({ status: 200, type: User })
  async getProfile(
    @GetUser() user,
    @Body() excludeObjectDto?: ExcludeObjectDto,
  ): Promise<User> {
    return await this.userService.me(user, excludeObjectDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('change-password')
  @SwaggerHeaderDecorator()
  @ApiResponse({ status: 200, type: Successful })
  changePassword(
    @GetUser() user,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<Successful> {
    return this.userService.changePassword(user, changePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('favorite/')
  @SwaggerHeaderDecorator()
  @ApiResponse({ status: 200, type: Successful })
  addToFavorite(
    @GetUser() user,
    @Body() addToFavoriteDto: AddToFavoriteDto,
  ): Promise<Successful> {
    return this.userPlantService.addToFavorite(user, addToFavoriteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('favorite/')
  @SwaggerHeaderDecorator()
  @ApiResponse({ status: 200, isArray: true, type: Plant })
  async getFavoritesList(@GetUser() user): Promise<Plant[]> {
    return await this.userPlantService.getFavoritesList(user);
  }
}
