import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionCodeName } from 'src/enum/exception-codes.enum';
import { getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { RequestUserPayload } from '../auth/interface/request-user-payload.interface';
import { PlantService } from '../plant/plant.service';
import { UserService } from '../user/user.service';
import { CreateUserPlantDto } from './dto/create-user-plant.dto';
import { UserPlant } from './user-plant.entity';

@Injectable()
export class UserPlantService {
  constructor(
    private userService: UserService,
    private plantService: PlantService,
  ) {}

  @Transactional()
  async create(
    createUserPlantDto: CreateUserPlantDto,
    requestUserPayload: RequestUserPayload,
  ): Promise<UserPlant> {
    const user = await this.userService.getOne(requestUserPayload);
    if (!user) {
      throw new UnauthorizedException(ExceptionCodeName.INVALID_CREDENTIALS);
    }
    const { plant_id, last_water_date } = createUserPlantDto;
    const userPlant = new UserPlant();
    const plant = await this.plantService.getOneById(plant_id);

    userPlant.user = user;
    userPlant.plant = plant;
    userPlant.last_water_date = last_water_date;

    return getRepository(UserPlant).save(userPlant);
  }

  @Transactional()
  async update(
    id: number,
    requestUserPayload: RequestUserPayload,
  ): Promise<UserPlant> {
    const userPlant = await this.getOneById(id, requestUserPayload.id);
    if (!userPlant) {
      throw new NotFoundException(ExceptionCodeName.INVALID_USER_PLANT_ID);
    }
    userPlant.last_water_date = new Date();
    return getRepository(UserPlant).save(userPlant);
  }

  @Transactional()
  async getAll(requestUserPayload: RequestUserPayload): Promise<UserPlant[]> {
    return await getRepository(UserPlant)
      .createQueryBuilder('user_plant')
      .leftJoinAndSelect('user_plant.user', 'user')
      .leftJoinAndSelect('user_plant.plant', 'plant')
      .where('user.id = :id', { id: requestUserPayload.id })
      .getMany();
  }

  @Transactional()
  async getOneById(id: number, user_id: number): Promise<UserPlant> {
    const res = await getRepository(UserPlant)
      .createQueryBuilder('user_plant')
      .leftJoinAndSelect('user_plant.user', 'user')
      .leftJoinAndSelect('user_plant.plant', 'plant')
      .where('user_plant.id = :id', { id })
      .where('user_plant.user.id = :user_id', { user_id })
      .getOne();
    console.log(res);
    if (!res) {
      throw new NotFoundException(ExceptionCodeName.INVALID_USER_PLANT_ID);
    }
    return res;
  }

  @Transactional()
  async delete(
    requestUserPayload: RequestUserPayload,
    id: number,
  ): Promise<void> {
    await getRepository(UserPlant)
      .createQueryBuilder()
      .delete()
      .where({
        user_id: requestUserPayload.id,
        id: id,
      })
      .execute();
  }
}
