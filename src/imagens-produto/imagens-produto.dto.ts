import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsUrl, Min } from 'class-validator';

export class CreateImagemProdutoDto {
  @IsNotEmpty({ message: 'URL da imagem é obrigatória' })
  @IsUrl({}, { message: 'URL da imagem inválida' })
  image_url: string;

  @IsNotEmpty({ message: 'Ordem é obrigatória' })
  @IsInt({ message: 'Ordem inválida' })
  @Min(0, { message: 'A ordem não pode ser negativa' })
  order: number;

  @IsNotEmpty({ message: 'Produto é obrigatório' })
  @IsInt({ message: 'Produto inválido' })
  product_id: number;
}

export class UpdateImagemProdutoDto extends PartialType(OmitType(CreateImagemProdutoDto, ['product_id'] as const)) {}
