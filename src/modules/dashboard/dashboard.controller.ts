import {
  Controller,
  Get,
} from '@nestjs/common';

import { DashboardService }
from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService:
      DashboardService,
  ) {}

  @Get('stats')
  stats() {
    return this.dashboardService
      .getStats();
  }

  @Get('revenue')
  revenue() {
    return this.dashboardService
      .getRevenueReport();
  }

  @Get('occupancy')
  occupancy() {
    return this.dashboardService
      .getOccupancyReport();
  }
}