import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard }
from '@nestjs/passport';

import { HousekeepingService }
from './housekeeping.service';

import { CreateTaskDto }
from './dto/create-task.dto';

@Controller('housekeeping')
@UseGuards(AuthGuard('jwt'))
export class HousekeepingController {
  constructor(
    private readonly housekeepingService:
      HousekeepingService,
  ) {}

  @Patch(':id/start')
start(
  @Param('id') id: string,
) {
  return this.housekeepingService.start(id);
}

  @Post()
  create(
    @Body() dto: CreateTaskDto,
  ) {
    return this.housekeepingService.create(dto);
  }

  @Patch(':id/complete')
  complete(
    @Param('id') id: string,
  ) {
    return this.housekeepingService.complete(id);
  }

  @Get()
  findAll() {
    return this.housekeepingService.findAll();
  }
}