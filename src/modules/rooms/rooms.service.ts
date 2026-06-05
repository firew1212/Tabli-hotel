import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =====================
  // ROOM TYPES
  // =====================

  createRoomType(dto: any) {
    return this.prisma.room_types.create({
      data: {
        name: dto.name,
        description: dto.description,
        base_price: dto.base_price,
      },
    });
  }

  findRoomTypes() {
    return this.prisma.room_types.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  // =====================
  // ROOMS
  // =====================

  createRoom(dto: any) {
    return this.prisma.rooms.create({
      data: {
        room_number: dto.room_number,
        room_type_id: dto.room_type_id,
        floor: dto.floor,
      },
    });
  }

  findAllRooms() {
    return this.prisma.rooms.findMany({
      include: {
        room_types: true,
      },

      orderBy: {
        room_number: 'asc',
      },
    });
  }

  findOneRoom(id: number) {
    return this.prisma.rooms.findUnique({
      where: { id },

      include: {
        room_types: true,
      },
    });
  }
}