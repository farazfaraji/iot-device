import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from './schemas/plant.schema';
import { PlantsManagerController } from './plants.manager.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Plant.name,
        useFactory: () => {
          return PlantSchema;
        },
      },
    ]),
  ],
  providers: [PlantsService],
  controllers: [PlantsController, PlantsManagerController],
})
export class PlantsModule {}
