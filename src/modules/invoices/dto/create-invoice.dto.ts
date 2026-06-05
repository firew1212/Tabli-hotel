import { IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  reservation_id!: string;
}