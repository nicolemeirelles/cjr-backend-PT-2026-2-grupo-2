import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsNumber()
  parent_category_id?: number; 
  
}
