import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { GuestsService } from './guests.service';

import { CreateGuestDto } from './dto/create-guest.dto';

@Controller('guests')
@UseGuards(AuthGuard('jwt'))
export class GuestsController {
  constructor(
    private readonly guestsService: GuestsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateGuestDto,
  ) {
    return this.guestsService.create(dto);
  }

  @Get()
  findAll() {
    return this.guestsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.guestsService.findOne(id);
  }
}