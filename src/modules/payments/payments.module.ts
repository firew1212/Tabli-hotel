import { Module } from '@nestjs/common';

import { PrismaModule }
  from '../../database/prisma/prisma.module';

import { PaymentsController }
  from './payments.controller';

import { PaymentsService }
  from './payments.service';
import { LedgerModule }
from '../ledger/ledger.module';

@Module({
  imports: [PrismaModule,
           LedgerModule
  ],

  controllers: [
    PaymentsController,
  ],

  providers: [
    PaymentsService,
  ],
})
export class PaymentsModule {}