import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';

import { CreateGuestDto } from './dto/create-guest.dto';

@Injectable()
export class GuestsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(dto: CreateGuestDto) {
    return this.prisma.guests.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.guests.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.guests.findUnique({
      where: { id },
    });
  }
}