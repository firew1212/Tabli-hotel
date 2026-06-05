import { Module } from '@nestjs/common';

import { PrismaModule }
from '../../database/prisma/prisma.module';

import { HousekeepingController }
from './housekeeping.controller';

import { HousekeepingService }
from './housekeeping.service';

@Module({
  imports: [PrismaModule],

  controllers: [
    HousekeepingController,
  ],

  providers: [
    HousekeepingService,
  ],
})
export class HousekeepingModule {}