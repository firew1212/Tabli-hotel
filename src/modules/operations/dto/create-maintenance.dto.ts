import {
  IsInt,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateMaintenanceDto {
  @IsInt()
  room_id!: number;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}