import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Plant, PlantDocument } from './schemas/plant.schema';
import { PlantsService } from './plants.service';
import { Role } from '../common/enums/role.enum';
import { GetUser } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { NewPlantDto } from './dto/new-plant.dto';
import { NewBreedDto } from './dto/new-breed.dto';

@ApiTags('Plants')
@Controller('plants/manager')
export class PlantsManagerController {
  constructor(protected readonly plantsService: PlantsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('plant')
  @ApiResponse({ status: 200, type: Plant })
  async createNewPlant(
    @GetUser(Role.Admin) user,
    @Body() newPlantDto: NewPlantDto,
  ): Promise<PlantDocument> {
    return this.plantsService.addNewPlant(user, newPlantDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('breed')
  @ApiResponse({ status: 200, type: NewBreedDto })
  async addBreed(
    @GetUser(Role.Admin) user,
    @Body() newBreedDto: NewBreedDto,
  ): Promise<NewBreedDto> {
    return this.plantsService.addNewBreedToPlant(user, newBreedDto);
  }
}
