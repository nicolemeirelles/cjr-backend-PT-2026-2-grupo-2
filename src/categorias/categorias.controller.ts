import { Controller, Get, Post, Body, } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './categorias.dto';
import { Public } from '../auth/decorators/isPublic.decorator';


@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  
}
