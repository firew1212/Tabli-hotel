import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService }
from '../../database/prisma/prisma.service';

import { CreateMaintenanceDto }
from './dto/create-maintenance.dto';

@Injectable()
export class OperationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createMaintenance(
    dto: CreateMaintenanceDto,
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

    const ticket =
      await this.prisma.maintenance_tickets.create({
        data: {
          room_id: dto.room_id,
          title: dto.title,
          description: dto.description,
        },
      });

    await this.prisma.audit_logs.create({
      data: {
        action: 'MAINTENANCE_CREATED',
        entity: 'maintenance_tickets',
        entity_id: ticket.id,
      },
    });

    return ticket;
  }

  findMaintenance() {
    return this.prisma.maintenance_tickets.findMany({
      include: {
        rooms: true,
        users: true,
      },

      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async updateMaintenanceStatus(
    id: string,
    status: string,
  ) {
    const ticket =
      await this.prisma.maintenance_tickets.update({
        where: { id },

        data: { status },
      });

    await this.prisma.audit_logs.create({
      data: {
        action: 'MAINTENANCE_UPDATED',
        entity: 'maintenance_tickets',
        entity_id: ticket.id,
      },
    });

    return ticket;
  }

  getAuditLogs() {
    return this.prisma.audit_logs.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}