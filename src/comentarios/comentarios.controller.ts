import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { Public } from '../auth/decorators/isPublic.decorator';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

const parseIntOpcional = new ParseIntPipe({ optional: true });

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() dto: CreateComentarioDto, @CurrentUser('sub') userId: number) {
    return this.comentariosService.create(dto, userId);
  }

  @Public()
  @Get()
  findAll(
    @Query('store_rating_id', parseIntOpcional) storeRatingId?: number,
    @Query('product_rating_id', parseIntOpcional) productRatingId?: number,
  ) {
    return this.comentariosService.findAll(storeRatingId, productRatingId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.comentariosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateComentarioDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.comentariosService.update(id, dto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.comentariosService.remove(id, userId);
  }
}
