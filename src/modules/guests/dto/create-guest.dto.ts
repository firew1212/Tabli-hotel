import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGuestDto {
  @IsString()
  full_name!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  id_number?: string;
}