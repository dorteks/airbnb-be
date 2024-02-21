import { Roles } from './role.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { TRole } from 'src/modules/drizzle/schema';
import { CanActivate, UseGuards, applyDecorators } from '@nestjs/common';

type TAuth = { roles?: TRole[] };

const initial = { roles: [] };

export const Auth = ({ roles = [] }: TAuth = initial) => {
  const guards: (Function | CanActivate)[] = [AuthGuard];
  const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    [];

  if (roles.length) {
    guards.push(RolesGuard);
    decorators.push(Roles(...roles));
  }

  return applyDecorators(...decorators, UseGuards(...guards));
};
