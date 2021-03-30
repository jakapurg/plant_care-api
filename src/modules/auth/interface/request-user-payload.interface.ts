import { UserRoleKey } from '../../user-role/enum/user-role-key.enum';

export interface RequestUserPayload {
  id: number;
  user_role: UserRoleKey;
  iat?: number;
  exp?: number;
}
