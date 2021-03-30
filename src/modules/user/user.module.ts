import { Module } from '@nestjs/common';
import { EncryptionModule } from '../encryption/encryption.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [EncryptionModule, UserRoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
