import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

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
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/[A-Z]/, { message: 'A senha deve ter pelo menos uma letra maiúscula' })
  @Matches(/[a-z]/, { message: 'A senha deve ter pelo menos uma letra minúscula' })
  @Matches(/\d/, { message: 'A senha deve ter pelo menos um número' })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'A senha deve ter pelo menos um caractere especial',
  })
  password: string;

  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  @IsString()
  confirmPassword: string;

  @IsOptional()
  @IsUrl({}, { message: 'URL da foto inválida' })
  profile_picture_url?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}