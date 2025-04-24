import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContatoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;
}
