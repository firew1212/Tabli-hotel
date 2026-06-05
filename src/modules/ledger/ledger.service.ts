import { Injectable } from '@nestjs/common';

import { PrismaService }
from '../../database/prisma/prisma.service';

@Injectable()
export class LedgerService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createEntry(
    referenceType: string,
    referenceId: string,
    entryType: string,
    amount: number,
    description: string,
  ) {
    return this.prisma.ledger_entries.create({
      data: {
        reference_type:
          referenceType,

        reference_id:
          referenceId,

        entry_type:
          entryType,

        amount,

        description,
      },
    });
  }

  findAll() {
    return this.prisma.ledger_entries.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}