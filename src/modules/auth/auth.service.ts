import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../database/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

async login(dto: LoginDto) {
  // 1. GET USER
  const user = await this.prisma.users.findUnique({
  where: {
    email: dto.email,
  },

  include: {
    user_roles: {
      include: {
        roles: {
          include: {
            role_permissions: {
              include: {
                permissions: true,
              },
            },
          },
        },
      },
    },
  },
});

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // 2. CHECK PASSWORD
  const passwordMatch = await bcrypt.compare(
    dto.password,
    user.password_hash,
  );

  if (!passwordMatch) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // 3. GET USER ROLES
  const userRoles =
    await this.prisma.user_roles.findMany({
      where: { user_id: user.id },
      include: { roles: true },
    });

 const roles = user.user_roles.map(
  (ur) => ur.roles.name,
);

  // 4. GET ROLE PERMISSIONS
  const rolePermissions =
    await this.prisma.role_permissions.findMany({
      where: {
        role_id: {
          in: userRoles.map((ur) => ur.role_id),
        },
      },
      include: { permissions: true },
    });

  const permissions = rolePermissions.map(
    (rp) => rp.permissions.name,
  );

  

  // 5. BUILD JWT PAYLOAD
  const payload = {
    sub: user.id,
    email: user.email,
    roles,
    permissions,
  };

  // 6. RETURN TOKEN
  return {
    access_token:
      await this.jwtService.signAsync(payload),
  };
}
}