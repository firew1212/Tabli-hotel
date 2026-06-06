import {
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  guest_id?: string;

  @IsOptional()
  room_id?: number;

  @IsArray()
  items!: {
    menu_item_id: number;
    quantity: number;
  }[];
}