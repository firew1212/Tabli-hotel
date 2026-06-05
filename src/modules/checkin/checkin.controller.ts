import {
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard }
  from '@nestjs/passport';

import { CheckinService }
  from './checkin.service';

@Controller('checkin')
@UseGuards(AuthGuard('jwt'))
export class CheckinController {
  constructor(
    private readonly checkinService:
      CheckinService,
  ) {}

  @Patch(':id/check-in')
  checkIn(
    @Param('id') id: string,
  ) {
    return this.checkinService.checkIn(id);
  }

  @Patch(':id/check-out')
  checkOut(
    @Param('id') id: string,
  ) {
    return this.checkinService.checkOut(id);
  }
}