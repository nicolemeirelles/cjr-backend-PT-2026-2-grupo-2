
import { IsInt, IsString, IsOptional, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateAvaliacaoLojaDto {
    @IsInt()
    @IsNotEmpty()
    user_id: number;
    @IsInt()
    @IsNotEmpty()
    store_id: number;
    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;
    @IsOptional()
    @IsString()
    comment?: string;
}
