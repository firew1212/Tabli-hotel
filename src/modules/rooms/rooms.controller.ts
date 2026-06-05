import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(AuthGuard('jwt'))
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
  ) {}

  // =====================
  // ROOM TYPES
  // =====================

  @Post('types')
  createRoomType(
    @Body() dto: any,
  ) {
    return this.roomsService.createRoomType(dto);
  }

  @Get('types')
  findRoomTypes() {
    return this.roomsService.findRoomTypes();
  }

  // =====================
  // ROOMS
  // =====================

  @Post()
  createRoom(
    @Body() dto: any,
  ) {
    return this.roomsService.createRoom(dto);
  }

  @Get()
  findAllRooms() {
    return this.roomsService.findAllRooms();
  }

  @Get(':id')
  findOneRoom(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.roomsService.findOneRoom(id);
  }
}