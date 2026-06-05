import {
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  invoice_id!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  method!: string;
}