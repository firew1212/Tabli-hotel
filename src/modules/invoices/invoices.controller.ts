import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard }
  from '@nestjs/passport';

import { InvoicesService }
  from './invoices.service';

import { CreateInvoiceDto }
  from './dto/create-invoice.dto';

@Controller('invoices')
@UseGuards(AuthGuard('jwt'))
export class InvoicesController {
  constructor(
    private readonly invoicesService:
      InvoicesService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateInvoiceDto,
  ) {
    return this.invoicesService.create(
      dto,
    );
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.invoicesService.findOne(id);
  }
}