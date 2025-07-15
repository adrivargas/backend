// src/users/dto/create-user.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  celular: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
