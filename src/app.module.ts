import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { GuestsModule } from './modules/guests/guests.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CheckinModule } from './modules/checkin/checkin.module';
import { HousekeepingModule } from './modules/housekeeping/housekeeping.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { OperationsModule } from './modules/operations/operations.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    RoomsModule,
    GuestsModule,
    ReservationsModule,
    InvoicesModule,
    PaymentsModule,
    CheckinModule,
    HousekeepingModule,
    OrdersModule,
    LedgerModule,
    OperationsModule,
    DashboardModule
  ],

  
})
export class AppModule {}