import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateReservationDto) {

  // =====================
  // CHECK ROOM EXISTS
  // =====================

  const room =
    await this.prisma.rooms.findUnique({
      where: {
        id: dto.room_id,
      },

      include: {
        room_types: true,
      },
    });

  if (!room) {
    throw new BadRequestException(
      'Room not found',
    );
  }

  // =====================
  // PREVENT DOUBLE BOOKING
  // =====================

  const conflict =
    await this.prisma.reservations.findFirst({
      where: {
        room_id: dto.room_id,

        status: {
          not: 'CANCELLED',
        },

        AND: [
          {
            check_in: {
              lt: new Date(dto.check_out),
            },
          },

          {
            check_out: {
              gt: new Date(dto.check_in),
            },
          },
        ],
      },
    });

  if (conflict) {
    throw new BadRequestException(
      'Room already booked for selected dates',
    );
  }

  // =====================
  // CALCULATE NIGHTS
  // =====================

  const checkIn =
    new Date(dto.check_in);

  const checkOut =
    new Date(dto.check_out);

  const nights =
    Math.ceil(
      (
        checkOut.getTime() -
        checkIn.getTime()
      ) /
        (1000 * 60 * 60 * 24),
    );

  if (nights <= 0) {
    throw new BadRequestException(
      'Invalid stay dates',
    );
  }

  // =====================
  // AUTO CALCULATE PRICE
  // =====================

  const totalAmount =
    Number(
      room.room_types?.base_price ?? 0,
    ) * nights;

  // =====================
  // CREATE RESERVATION
  // =====================

  return this.prisma.reservations.create({
    data: {
      guest_id: dto.guest_id,

      room_id: dto.room_id,

      check_in: checkIn,

      check_out: checkOut,

      status:
        dto.status ??
        'PENDING',

      total_amount: totalAmount,
    },
  });
}

  findAll() {
    return this.prisma.reservations.findMany({
      include: {
        guests: true,
        rooms: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.reservations.findUnique({
      where: { id },
      include: {
        guests: true,
        rooms: true,
      },
    });
  }
}