import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from './roles.decorator';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>(
        PERMISSIONS_KEY,
        [context.getHandler(), context.getClass()],
      );

    const request = context
      .switchToHttp()
      .getRequest();

    const user = request.user;

    // If no rules → allow
    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    // No user → deny
    if (!user) return false;

    // ROLE CHECK (array-based)
    if (requiredRoles) {
      const hasRole = requiredRoles.some(
        (role) => user.roles.includes(role),
      );

      if (!hasRole) return false;
    }

    // PERMISSION CHECK
    if (requiredPermissions) {
      const hasPermission =
        requiredPermissions.every((p) =>
          user.permissions.includes(p),
        );

      if (!hasPermission) return false;
    }

    return true;
  }
}