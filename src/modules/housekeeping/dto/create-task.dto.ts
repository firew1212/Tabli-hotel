import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  room_id!: number;

  @IsOptional()
  @IsString()
  assigned_to?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}