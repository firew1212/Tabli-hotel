import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
} from '@nestjs/common';

import { OperationsService }
from './operations.service';

import { CreateMaintenanceDto }
from './dto/create-maintenance.dto';

@Controller('operations')
export class OperationsController {
  constructor(
    private readonly operationsService:
      OperationsService,
  ) {}

  @Post('maintenance')
  createMaintenance(
    @Body() dto: CreateMaintenanceDto,
  ) {
    return this.operationsService
      .createMaintenance(dto);
  }

  @Get('maintenance')
  findMaintenance() {
    return this.operationsService
      .findMaintenance();
  }

  @Patch('maintenance/:id/:status')
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: string,
  ) {
    return this.operationsService
      .updateMaintenanceStatus(
        id,
        status,
      );
  }

  @Get('audit-logs')
  getAuditLogs() {
    return this.operationsService
      .getAuditLogs();
  }
}