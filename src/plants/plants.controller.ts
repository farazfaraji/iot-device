import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlantsService } from './plants.service';
import { AuthGuard } from '@nestjs/passport';
import { NewBreedDto } from './dto/new-breed.dto';
import { GetUser } from '../common/decorators/roles.decorator';
import { Plant, PlantDocument } from './schemas/plant.schema';
import { Breed } from './types/breed.type';
import { GetBreedDto } from './dto/get-breed.dto';
import { SwaggerHeaderDecorator } from '../common/decorators/swagger-header.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Plants')
@Controller('plants')
export class PlantsController {
  constructor(protected readonly plantsService: PlantsService) {}

  @UseGuards(AuthGuard('jwt'))
  @SwaggerHeaderDecorator()
  @Get('')
  @ApiResponse({ status: 200, type: Plant, isArray: true })
  async getListOfPlants(
    @GetUser() user,
    @Query() paginationDto: PaginationDto,
  ): Promise<PlantDocument[]> {
    return this.plantsService.getListOfPlants(user, paginationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @SwaggerHeaderDecorator()
  @Get('breed')
  @ApiResponse({ status: 200, type: Breed, isArray: true })
  async getBreedById(@Body() getBreedDto: GetBreedDto): Promise<any> {
    return this.plantsService.getBreedById(getBreedDto);
  }
}
