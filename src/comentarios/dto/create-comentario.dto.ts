import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateComentarioDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  content: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  store_rating_id?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  product_rating_id?: number;
}
