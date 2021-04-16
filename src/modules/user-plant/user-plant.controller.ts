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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RequestUserPayload } from '../auth/interface/request-user-payload.interface';
import { CreateUserPlantDto } from './dto/create-user-plant.dto';
import { UserPlant } from './user-plant.entity';
import { UserPlantService } from './user-plant.service';

@ApiTags('user-plant')
@Controller('user-plant')
export class UserPlantController {
  constructor(private readonly userPlantService: UserPlantService) {}

  @ApiOkResponse({
    description: "List of all user's plant",
    type: [UserPlant],
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @GetUser() requestUserPayload: RequestUserPayload,
  ): Promise<UserPlant[]> {
    return this.userPlantService.getAll(requestUserPayload);
  }

  @ApiOkResponse({
    description: 'Users plant with selected id',
    type: UserPlant,
  })
  @ApiNotFoundResponse({
    description: 'Plant is not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(
    @GetUser() requestUserPayload: RequestUserPayload,
    @Param('id') id: number,
  ): Promise<UserPlant> {
    return this.userPlantService.getOneById(id, requestUserPayload.id);
  }

  @ApiCreatedResponse({
    description: "User's plant was created",
    type: UserPlant,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not logged in',
  })
  @ApiBadRequestResponse({
    description: 'Invalid body',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    createUserPlantDto: CreateUserPlantDto,
    @GetUser() requestUserPayload: RequestUserPayload,
  ): Promise<UserPlant> {
    return this.userPlantService.create(createUserPlantDto, requestUserPayload);
  }

  @ApiOkResponse({
    description: "User's plant's last water date was updated",
    type: UserPlant,
  })
  @ApiUnauthorizedResponse({
    description: 'User is logged in',
  })
  @ApiNotFoundResponse({
    description: "User's plant was not found",
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @GetUser() requestUserPayload: RequestUserPayload,
  ): Promise<UserPlant> {
    return this.userPlantService.update(id, requestUserPayload);
  }

  @ApiOkResponse({
    description: "User's plant was deleted",
  })
  @ApiNotFoundResponse({
    description: "User's plant was not found",
  })
  @ApiUnauthorizedResponse({
    description: 'User is logged in',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @GetUser() requestUserPayload: RequestUserPayload,
  ): Promise<void> {
    return this.userPlantService.delete(requestUserPayload, id);
  }
}
