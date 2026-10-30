
import {IsInt, IsEmpty, IsString, IsOptional, Min, Max} from 'class-validator';

export class CreateAvaliacaoProdutoDto {
    @IsInt()
    @IsEmpty()
    user_id: number;
    @IsEmpty()
    @IsInt()
    product_id: number;
    @Min(0)
    @Max(5)
    @IsInt()
    rating: number;
    @IsOptional()
    @IsString()
    comment?: string;
}
