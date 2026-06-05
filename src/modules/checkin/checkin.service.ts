import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService }
  from '../../database/prisma/prisma.service';

@Injectable()
export class CheckinService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =====================
  // CHECK IN
  // =====================

  async checkIn(
    reservationId: string,
  ) {
    const reservation =
  await this.prisma.reservations.findUnique({
    where: {
      id: reservationId,
    },
  });

if (!reservation) {
  throw new BadRequestException(
    'Reservation not found',
  );
}

const invoice =
  await this.prisma.invoices.findFirst({
    where: {
      reservation_id: reservation.id,
    },
  });

if (!invoice) {
  throw new BadRequestException(
    'Invoice not found',
  );
}

if (invoice.status !== 'PAID') {
  throw new BadRequestException(
    'Invoice must be paid before check in',
  );
}

    if (!reservation) {
      throw new BadRequestException(
        'Reservation not found',
      );
    }

    if (
      reservation.status ===
      'CHECKED_IN'
    ) {
      throw new BadRequestException(
        'Guest already checked in',
      );
    }

    await this.prisma.rooms.update({
      where: {
        id: reservation.room_id!,
      },

      data: {
        status: 'OCCUPIED',
      },
    });

    return this.prisma.reservations.update({
      where: {
        id: reservationId,
      },

      data: {
        status: 'CHECKED_IN',
      },
    });
  }

  // =====================
  // CHECK OUT
  // =====================

  async checkOut(
    reservationId: string,
  ) {
    const reservation =
      await this.prisma.reservations.findUnique({
        where: {
          id: reservationId,
        },
      });

    if (!reservation) {
      throw new BadRequestException(
        'Reservation not found',
      );
    }

    if (
      reservation.status !==
      'CHECKED_IN'
    ) {
      throw new BadRequestException(
        'Guest is not checked in',
      );
    }

    await this.prisma.rooms.update({
      where: {
        id: reservation.room_id!,
      },

      data: {
        status: 'AVAILABLE',
      },
    });

    return this.prisma.reservations.update({
      where: {
        id: reservationId,
      },

      data: {
        status: 'CHECKED_OUT',
      },
    });
  }
}