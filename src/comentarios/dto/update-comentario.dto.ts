import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateComentarioDto {
  @IsInt()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  content: string;
}