import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

import { ReservationStatus }
  from '../enums/reservation-status.enum';

export class CreateReservationDto {
  @IsString()
  guest_id!: string;

  @IsInt()
  room_id!: number;

  @IsDateString()
  check_in!: string;

  @IsDateString()
  check_out!: string;

  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;
}