import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionCodeName } from 'src/enum/exception-codes.enum';
import { getRepository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { RequestUserPayload } from '../auth/interface/request-user-payload.interface';
import { EncryptionService } from '../encryption/encryption.service';
import { UserRoleKey } from '../user-role/enum/user-role-key.enum';
import { UserRoleService } from '../user-role/user-role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetOneByKey } from './enum/get-one-by-key.enum';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private encryptionService: EncryptionService,
    private configService: ConfigService,
    private userRoleService: UserRoleService,
  ) {}

  @Transactional()
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const existingUser = await this.getOneBy([
      { getOneByKey: GetOneByKey.EMAIL, value: email },
    ]);
    if (existingUser) {
      throw new ConflictException(ExceptionCodeName.EMAIL_CONFLICT);
    }
    const user = new User();
    user.email = email;
    user.password = password;
    const userRole = await this.userRoleService.getUserRoleByUserRoleKey(
      UserRoleKey.USER,
    );
    user.user_role = userRole;
    return await getRepository(User).save(user);
  }

  @Transactional()
  async getOneBy(
    filter: {
      getOneByKey: GetOneByKey;
      value: number | string;
    }[],
  ): Promise<User | undefined> {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.user_role', 'user_role')
      .where(
        filter.map((el) => {
          return { [el.getOneByKey]: el.value };
        }),
      )
      .getOne();
    return user;
  }

  @Transactional()
  async getOne(requestUserPayload: RequestUserPayload): Promise<User> {
    const { id } = requestUserPayload;

    const user = await this.getOneBy([
      { getOneByKey: GetOneByKey.ID, value: id },
    ]);
    console.log(user);
    if (!user) {
      throw new NotFoundException(ExceptionCodeName.INVALID_USER_ID);
    }

    return user;
  }
}
