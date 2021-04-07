import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { UserRoleKey } from '../user-role/enum/user-role-key.enum';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './plant.entity';
import { PlantService } from './plant.service';

@ApiTags('plant')
@ApiBearerAuth()
@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Plant[]> {
    return this.plantService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Plant> {
    return this.plantService.getOneById(id);
  }

  @Roles(UserRoleKey.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createPlantDto: CreatePlantDto): Promise<Plant> {
    return this.plantService.create(createPlantDto);
  }

  @Roles(UserRoleKey.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('id')
  async update(
    @Param('id') id: number,
    @Body() updatePlantDto: UpdatePlantDto,
  ): Promise<Plant> {
    return this.plantService.update(id, updatePlantDto);
  }

  @Roles(UserRoleKey.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.plantService.delete(id);
  }
}
