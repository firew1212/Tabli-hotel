import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService }
  from '../../database/prisma/prisma.service';

import { CreateInvoiceDto }
  from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateInvoiceDto,
  ) {
    const reservation =
      await this.prisma.reservations.findUnique({
        where: {
          id: dto.reservation_id,
        },
      });

    if (!reservation) {
      throw new BadRequestException(
        'Reservation not found',
      );
    }

    const existingInvoice =
      await this.prisma.invoices.findFirst({
        where: {
          reservation_id:
            dto.reservation_id,
        },
      });

    if (existingInvoice) {
      throw new BadRequestException(
        'Invoice already exists',
      );
    }

    return this.prisma.invoices.create({
      data: {
        guest_id:
          reservation.guest_id,

        reservation_id:
          reservation.id,

        total_amount:
          reservation.total_amount,

        status: 'UNPAID',
      },
    });
  }

  

  findAll() {
    return this.prisma.invoices.findMany({
      include: {
        guests: true,
        reservations: true,
        payments: true,
      },

      orderBy: {
        created_at: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.invoices.findUnique({
      where: { id },

      include: {
        guests: true,
        reservations: true,
        payments: true,
      },
    });
  }
}