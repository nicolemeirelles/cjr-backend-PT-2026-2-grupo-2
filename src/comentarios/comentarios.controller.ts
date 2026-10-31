import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query,} from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

const parseIntOpcional = new ParseIntPipe({ optional: true });

export class ComentariosController {
  constructor(
    private readonly comentariosService: ComentariosService,
  ) {}

  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.create(createComentarioDto);
  }

  @Get()
  findAll(
    @Query('store_rating_id', parseIntOpcional) storeRatingId?: number,
    @Query('product_rating_id', parseIntOpcional) productRatingId?: number,
  ) {
    return this.comentariosService.findAll(
      storeRatingId,
      productRatingId,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.comentariosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentarioAvaliacaoDto: UpdateComentarioDto,
  ) {
    return this.comentariosService.update(
      id,
      updateComentarioAvaliacaoDto,
    );
  }
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.comentariosService.remove(id, userId);
  }
}