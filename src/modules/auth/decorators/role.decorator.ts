import { SetMetadata } from '@nestjs/common';
import { TRole } from 'src/modules/drizzle/schema';

export const ROLES = 'ROLES';

export const Roles = (...roles: TRole[]) => SetMetadata(ROLES, roles);
