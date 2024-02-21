import { Reflector } from '@nestjs/core';
import { ROLES } from '../decorators/role.decorator';
import { TRole, TUser } from 'src/modules/drizzle/schema';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<TRole[]>(
      ROLES,
      context.getHandler(),
    );

    if (!requiredRoles?.length) return true;
    const req = context.switchToHttp().getRequest();
    const user: TUser = req.user;

    return requiredRoles.includes(user.role);
  }
}
