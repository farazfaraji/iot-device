import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Successful } from '../common/types/successful.type';
import { Status } from '../common/enums/status.enum';
import { AddToFavoriteDto } from './dto/add-to-favorite.dto';
import { Plant } from '../plants/schemas/plant.schema';

@Injectable()
export class UserPlantService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async addToFavorite(
    user: User,
    addToFavoriteDto: AddToFavoriteDto,
  ): Promise<Successful> {
    await this.userModel.findByIdAndUpdate(user.userId, {
      $addToSet: { favorites: addToFavoriteDto.plantId },
    });
    return { message: 'plant added to favorite list', status: Status.OK };
  }

  async getFavoritesList(user: User): Promise<Plant[]> {
    const favPopulated = await this.userModel
      .findById(user.userId)
      .populate('favorites')
      .exec();
    return favPopulated.favorites;
  }
}
