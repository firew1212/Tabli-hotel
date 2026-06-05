import { IsNumber, IsString } from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  base_price!: number;
}