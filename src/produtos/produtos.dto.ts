import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'Nome do produto é obrigatório' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'Preço é obrigatório' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Preço inválido' })
  @IsPositive({ message: 'O preço deve ser maior que zero' })
  @Max(999999.99, { message: 'Preço acima do permitido' })
  price: number;

  @IsNotEmpty({ message: 'Estoque é obrigatório' })
  @IsInt({ message: 'Estoque inválido' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  stock: number;

  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  @IsInt({ message: 'Categoria inválida' })
  category_id: number;

  @IsNotEmpty({ message: 'Loja é obrigatória' })
  @IsInt({ message: 'Loja inválida' })
  store_id: number;
}

export class UpdateProdutoDto extends PartialType(OmitType(CreateProdutoDto, ['store_id'] as const)) {}
