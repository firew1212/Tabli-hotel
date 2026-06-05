import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // GET ALL USERS
  findAll() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        full_name: true,
        email: true,
        phone: true,
        is_active: true,
        created_at: true,
      },
    });
  }

  // GET ONE USER
  findOne(id: string) {
  return this.prisma.users.findUnique({
    where: { id },

    select: {
      id: true,
      full_name: true,
      email: true,
      phone: true,
      is_active: true,
      created_at: true,
    },
  });
}
}