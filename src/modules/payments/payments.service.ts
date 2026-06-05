import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService }
  from '../../database/prisma/prisma.service';

import { CreatePaymentDto }
  from './dto/create-payment.dto';
  import { LedgerService }
from '../ledger/ledger.service';

@Injectable()
export class PaymentsService {
  constructor(
  private readonly prisma: PrismaService,
  private readonly ledgerService: LedgerService,
) {}

  async create(
    dto: CreatePaymentDto,
  ) {
    const invoice =
      await this.prisma.invoices.findUnique({
        where: {
          id: dto.invoice_id,
        },

        include: {
          payments: true,
        },
      });

    if (!invoice) {
      throw new BadRequestException(
        'Invoice not found',
      );
    }

    const payment =
      await this.prisma.payments.create({
        data: {
          invoice_id: dto.invoice_id,
          amount: dto.amount,
          method: dto.method,
        },
      });

    const totalPaid =
      invoice.payments.reduce(
        (sum, p) => sum + Number(p.amount),
        0,
      ) + dto.amount;

    const invoiceTotal =
      Number(invoice.total_amount);

    let status = 'UNPAID';

    if (totalPaid >= invoiceTotal) {
      status = 'PAID';
        await this.ledgerService.createEntry(
    'INVOICE',
    invoice.id,
    'CREDIT',
    invoiceTotal,
    'Invoice fully paid',
  );

    } else if (totalPaid > 0) {
      status = 'PARTIAL';
    }

    await this.prisma.invoices.update({
      where: {
        id: invoice.id,
      },

      data: {
        status,
      },
    });

    return payment;
  }

  findAll() {
    return this.prisma.payments.findMany({
      include: {
        invoices: true,
      },

      orderBy: {
        paid_at: 'desc',
      },
    });
  }
}