import { Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionCodeName } from 'src/enum/exception-codes.enum';
import { getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './plant.entity';

@Injectable()
export class PlantService {
  @Transactional()
  async create(createPlantDto: CreatePlantDto): Promise<Plant> {
    const { name, info, image_path, days_water, care } = createPlantDto;

    const plant = new Plant();
    plant.name = name;
    plant.care = care;
    plant.info = info;
    plant.image_path = image_path;
    plant.days_water = days_water;

    return getRepository(Plant).save(plant);
  }

  @Transactional()
  async update(id: number, updatePlantDto: UpdatePlantDto): Promise<Plant> {
    const { name, info, image_path, days_water, care } = updatePlantDto;
    const plant = await this.getOneById(id);
    plant.name = name;
    plant.care = care;
    plant.info = info;
    plant.image_path = image_path;
    plant.days_water = days_water;
    return getRepository(Plant).save(plant);
  }

  @Transactional()
  async getAll(): Promise<Plant[]> {
    return getRepository(Plant).createQueryBuilder('plant').getMany();
  }

  @Transactional()
  async getOneById(id: number): Promise<Plant> {
    const res = await getRepository(Plant)
      .createQueryBuilder('plant')
      .where('plant.id = :id', { id })
      .getOne();
    if (!res) {
      throw new NotFoundException(ExceptionCodeName.INVALID_PLANT_ID);
    }
    return res;
  }

  @Transactional()
  async delete(id: number): Promise<void> {
    getRepository(Plant)
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
