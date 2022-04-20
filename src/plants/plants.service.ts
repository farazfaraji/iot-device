import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Plant, PlantDocument } from './schemas/plant.schema';
import { User } from '../users/schemas/user.schema';
import { NewPlantDto } from './dto/new-plant.dto';
import { NewBreedDto } from './dto/new-breed.dto';
import { Breed } from './types/breed.type';
import { GetBreedDto } from './dto/get-breed.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant.name) private plantModel: Model<PlantDocument>,
  ) {}

  async addNewPlant(
    user: User,
    newPlantDto: NewPlantDto,
  ): Promise<PlantDocument> {
    newPlantDto.addedBy = new mongoose.Types.ObjectId(user.userId);
    return await this.plantModel.create(newPlantDto);
  }

  async addNewBreedToPlant(
    user: User,
    newBreedDto: NewBreedDto,
  ): Promise<NewBreedDto> {
    const plantId = newBreedDto.plantId;
    delete newBreedDto.plantId;
    newBreedDto._id = new mongoose.Types.ObjectId();
    await this.plantModel.findByIdAndUpdate(plantId, {
      $push: { breeds: newBreedDto },
    });
    return newBreedDto;
  }

  async getListOfPlants(
    user: User,
    paginationDto: PaginationDto,
  ): Promise<PlantDocument[]> {
    return this.plantModel
      .find({ status: 1 })
      .limit(paginationDto.per_page)
      .skip(paginationDto.page * paginationDto.per_page)
      .exec();
  }

  async getBreedById(getBreedDto: GetBreedDto) {
    return this.plantModel
      .findOne(
        {
          _id: getBreedDto.plantId,
          breeds: {
            $elemMatch: {
              _id: new mongoose.Types.ObjectId(getBreedDto.breedId),
            },
          },
        },
        { 'breeds.$': 1, name: 1 },
      )
      .exec();
  }
}
