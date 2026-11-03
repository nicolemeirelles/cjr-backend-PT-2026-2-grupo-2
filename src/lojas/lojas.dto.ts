import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateLojaDto {
  @IsNotEmpty({ message: 'Nome da loja é obrigatório' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Descrição da loja é obrigatória' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Logo da loja é obrigatória' })
  @IsUrl({}, { message: 'URL da logo inválida' })
  logo_url: string;

  @IsNotEmpty({ message: 'Banner da loja é obrigatório' })
  @IsUrl({}, { message: 'URL do banner inválida' })
  banner_url: string;

  @IsNotEmpty({ message: 'Sticker da loja é obrigatório' })
  @IsUrl({}, { message: 'URL do sticker inválida' })
  sticker_url: string;

  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  @IsInt({ message: 'Categoria inválida' })
  category_id: number;
}

export class UpdateLojaDto extends PartialType(CreateLojaDto) {}
