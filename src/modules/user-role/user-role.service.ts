import { Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionCodeName } from 'src/enum/exception-codes.enum';
import { getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserRoleKey } from './enum/user-role-key.enum';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  @Transactional()
  async getAll(): Promise<UserRole[]> {
    return getRepository(UserRole).createQueryBuilder('user_role').getMany();
  }

  @Transactional()
  async getUserRoleByUserRoleKey(key: UserRoleKey): Promise<UserRole> {
    const res = await getRepository(UserRole)
      .createQueryBuilder('user_role')
      .where('user_role.key = :key', { key })
      .getOne();
    if (!res) {
      throw new NotFoundException(ExceptionCodeName.INVALID_USER_ROLE_KEY);
    }

    return res;
  }
}
