import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService }
from '../../database/prisma/prisma.service';

import { CreateTaskDto }
from './dto/create-task.dto';

@Injectable()
export class HousekeepingService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateTaskDto,
  ) {
    const room =
      await this.prisma.rooms.findUnique({
        where: {
          id: dto.room_id,
        },
      });

    if (!room) {
      throw new BadRequestException(
        'Room not found',
      );
    }

    return this.prisma.housekeeping_tasks.create({
      data: {
        room_id: dto.room_id,
        assigned_to: dto.assigned_to,
        notes: dto.notes,
        status: 'PENDING',
      },
    });
  }

  async complete(
    id: string,
  ) {
    const task =
      await this.prisma.housekeeping_tasks.findUnique({
        where: { id },
      });

    if (!task) {
      throw new BadRequestException(
        'Task not found',
      );
    }

    await this.prisma.rooms.update({
      where: {
        id: task.room_id!,
      },

      data: {
        status: 'AVAILABLE',
      },
    });

    return this.prisma.housekeeping_tasks.update({
      where: { id },

      data: {
        status: 'COMPLETED',
      },
    });
  }

  findAll() {
    return this.prisma.housekeeping_tasks.findMany({
      include: {
        rooms: true,
        users: true,
      },

      orderBy: {
        created_at: 'desc',
      },
    });
  }
}