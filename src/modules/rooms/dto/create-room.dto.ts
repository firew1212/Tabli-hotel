import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  room_number!: string;

  @IsInt()
  room_type_id!: number;

  @IsOptional()
  @IsInt()
  floor?: number;
}