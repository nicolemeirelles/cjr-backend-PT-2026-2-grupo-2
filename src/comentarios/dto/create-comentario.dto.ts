import {IsInt, IsNotEmpty, IsOptional, IsString, MaxLength,} from 'class-validator';

export class CreateComentarioDto {
  
  @IsInt()
  user_id: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  content: string;
  @IsOptional()
  @IsInt()
  store_rating_id?: number;
  @IsOptional()
  @IsInt()
  product_rating_id?: number;
}
