import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard }
  from '@nestjs/passport';

import { PaymentsService }
  from './payments.service';

import { CreatePaymentDto }
  from './dto/create-payment.dto';

@Controller('payments')
@UseGuards(AuthGuard('jwt'))
export class PaymentsController {
  constructor(
    private readonly paymentsService:
      PaymentsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentsService.create(dto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }
}