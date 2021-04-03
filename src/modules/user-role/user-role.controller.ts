import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { UserRoleKey } from './enum/user-role-key.enum';
import { UserRole } from './user-role.entity';
import { UserRoleService } from './user-role.service';

@ApiTags('user-role')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @ApiOkResponse({
    description: 'Get all user roles',
    type: [UserRole],
  })
  @Roles(UserRoleKey.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async getAll(): Promise<UserRole[]> {
    return this.userRoleService.getAll();
  }
}
