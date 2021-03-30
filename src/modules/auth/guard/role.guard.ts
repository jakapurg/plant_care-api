import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExceptionCodeName } from '../../../enum/exception-codes.enum';
import { RequestUserPayload } from '../interface/request-user-payload.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const requestUserPayload: RequestUserPayload = request.user;
    if (requestUserPayload && roles.includes(requestUserPayload.user_role)) {
      return true;
    }
    throw new ForbiddenException(ExceptionCodeName.FORBIDDEN_RESOURCE);
  }
}
