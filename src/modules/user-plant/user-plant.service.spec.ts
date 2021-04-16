import { Test, TestingModule } from '@nestjs/testing';
import { UserPlantService } from './user-plant.service';

describe('UserPlantService', () => {
  let service: UserPlantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPlantService],
    }).compile();

    service = module.get<UserPlantService>(UserPlantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
