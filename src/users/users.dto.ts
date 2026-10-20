import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Nome de usuário é obrigatório' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  confirmPassword: string;

  @IsOptional()
  @IsUrl({}, { message: 'URL da foto inválida' })
  profile_picture_url?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}