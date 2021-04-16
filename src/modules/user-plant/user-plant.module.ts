import { Module } from '@nestjs/common';
import { PlantModule } from '../plant/plant.module';
import { UserModule } from '../user/user.module';
import { UserPlantController } from './user-plant.controller';
import { UserPlantService } from './user-plant.service';

@Module({
  imports: [UserModule, PlantModule],
  controllers: [UserPlantController],
  providers: [UserPlantService],
  exports: [UserPlantService],
})
export class UserPlantModule {}
