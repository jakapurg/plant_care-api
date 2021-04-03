import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/modules/config/config.service';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import { UserRoleKey } from 'src/modules/user-role/enum/user-role-key.enum';
import { UserRole } from 'src/modules/user-role/user-role.entity';
import { User } from 'src/modules/user/user.entity';
import { getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class SeedService {
  constructor(
    private configService: ConfigService,
    private encryptionService: EncryptionService,
  ) {}

  @Transactional()
  async seed(): Promise<void> {
    const [userRoleAdmin, userRoleUser] = await Promise.all(
      [
        {
          id: 1,
          key: UserRoleKey.ADMIN,
        },
        {
          id: 2,
          key: UserRoleKey.USER,
        },
      ].map((ur) => {
        const userRole = new UserRole();
        userRole.id = ur.id;
        userRole.key = ur.key;
        return getRepository(UserRole).save(userRole);
      }),
    );
    const [adminUser] = await Promise.all(
      [
        {
          id: 1,
          email: 'info@plant-care.com',
          password: await this.encryptionService.hashPassword('PlantCare2021!'),
          user_role: userRoleAdmin,
        },
        {
          id: 2,
          email: 'user@plant-care.com',
          password: await this.encryptionService.hashPassword('PlantCareUser!'),
          user_role: userRoleUser,
        },
      ].map((u) => {
        const user = new User();
        user.id = u.id;
        user.email = u.email;
        user.password = u.password;
        user.user_role = u.user_role;
        return getRepository(User).save(user);
      }),
    );
  }
}
