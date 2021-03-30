import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExceptionCodeName } from '../../../enum/exception-codes.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser>(err: Error, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException(ExceptionCodeName.INVALID_JWT);
    }
    return user;
  }
}
