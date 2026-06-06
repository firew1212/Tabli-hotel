import { Injectable } from '@nestjs/common';

import { PrismaService }
from '../../database/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getStats() {
    const [
      totalRooms,
      occupiedRooms,
      totalReservations,
      totalGuests,
      totalInvoices,
      totalPayments,
      totalOrders,
      maintenanceOpen,
    ] = await Promise.all([
      this.prisma.rooms.count(),

      this.prisma.rooms.count({
        where: {
          status: 'OCCUPIED',
        },
      }),

      this.prisma.reservations.count(),

      this.prisma.guests.count(),

      this.prisma.invoices.count(),

      this.prisma.payments.count(),

      this.prisma.orders.count(),

      this.prisma.maintenance_tickets.count({
        where: {
          status: 'OPEN',
        },
      }),
    ]);

    return {
      totalRooms,
      occupiedRooms,
      availableRooms:
        totalRooms - occupiedRooms,

      totalReservations,
      totalGuests,

      totalInvoices,
      totalPayments,

      totalOrders,

      maintenanceOpen,
    };
  }

  async getRevenueReport() {
  const payments =
    await this.prisma.payments.findMany();

  const revenue =
    payments.reduce(
      (sum, p) =>
        sum + Number(p.amount),
      0,
    );

  return {
    totalRevenue: revenue,
    totalPayments:
      payments.length,
  };
}

async getOccupancyReport() {
  const totalRooms =
    await this.prisma.rooms.count();

  const occupiedRooms =
    await this.prisma.rooms.count({
      where: {
        status: 'OCCUPIED',
      },
    });

  return {
    totalRooms,
    occupiedRooms,

    occupancyRate:
      totalRooms === 0
        ? 0
        : (
            occupiedRooms /
            totalRooms
          ) * 100,
  };
}
}