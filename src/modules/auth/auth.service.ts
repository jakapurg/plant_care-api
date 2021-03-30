import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExceptionCodeName } from 'src/enum/exception-codes.enum';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EncryptionService } from '../encryption/encryption.service';
import { AccessToken } from '../encryption/interface/access-token.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { GetOneByKey } from '../user/enum/get-one-by-key.enum';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService,
  ) {}

  @Transactional()
  async getAccessToken(user: User): Promise<AccessToken> {
    return await this.encryptionService.generateAccessToken(
      user.id,
      user.user_role.key,
    );
  }

  @Transactional()
  async signUp(createUserDto: CreateUserDto): Promise<AccessToken> {
    const { password } = createUserDto;
    createUserDto.password =
      password && (await this.encryptionService.hashPassword(password));
    const user = await this.userService.create(createUserDto);
    return this.encryptionService.generateAccessToken(
      user.id,
      user.user_role.key,
    );
  }

  @Transactional()
  async validateUserLocal(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<User> {
    const { email, password } = userCredentialsDto;

    const user = await this.userService.getOneBy([
      { getOneByKey: GetOneByKey.EMAIL, value: email },
    ]);
    if (!user) {
      throw new UnauthorizedException(ExceptionCodeName.INVALID_CREDENTIALS);
    }
    console.log(user);
    const isValidPassword =
      user.password &&
      (await this.encryptionService.comparePassword(password, user.password));

    if (!isValidPassword) {
      throw new UnauthorizedException(ExceptionCodeName.INVALID_CREDENTIALS);
    }

    return user;
  }
}
