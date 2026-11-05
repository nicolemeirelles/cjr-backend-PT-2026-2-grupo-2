import {IsInt, IsOptional, IsPositive, IsString, Max, MaxLength, Min,} from 'class-validator';

export class UpdateAvaliacaoLojaDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;
}