import {IsInt, IsOptional, IsPositive, IsString, Max, MaxLength, Min,} from 'class-validator';

export class CreateAvaliacaoProdutoDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsInt()
  @IsPositive()
  product_id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;
}