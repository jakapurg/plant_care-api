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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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

  @ApiOkResponse({
    description: 'List of all plants',
    type: [Plant],
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Plant[]> {
    return this.plantService.getAll();
  }

  @ApiOkResponse({
    description: 'Plant with selected id',
    type: Plant,
  })
  @ApiNotFoundResponse({
    description: 'Plant is not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Plant> {
    return this.plantService.getOneById(id);
  }

  @ApiCreatedResponse({
    description: 'Plant was created',
    type: Plant,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not admin',
  })
  @ApiBadRequestResponse({
    description: 'Invalid body',
  })
  @Roles(UserRoleKey.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createPlantDto: CreatePlantDto): Promise<Plant> {
    return this.plantService.create(createPlantDto);
  }

  @ApiCreatedResponse({
    description: 'Plant was updated',
    type: Plant,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not admin',
  })
  @ApiBadRequestResponse({
    description: 'Invalid body',
  })
  @Roles(UserRoleKey.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('id')
  async update(
    @Param('id') id: number,
    @Body() updatePlantDto: UpdatePlantDto,
  ): Promise<Plant> {
    return this.plantService.update(id, updatePlantDto);
  }

  @ApiOkResponse({
    description: 'Plant was deleted',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not admin',
  })
  @Roles(UserRoleKey.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.plantService.delete(id);
  }
}
