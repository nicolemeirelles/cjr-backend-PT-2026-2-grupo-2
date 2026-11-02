import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query,} from '@nestjs/common';
import { AvaliacaoLojaService } from './avaliacao-loja.service';
import { CreateAvaliacaoLojaDto } from './dto/create-avaliacao-loja.dto';
import { UpdateAvaliacaoLojaDto } from './dto/update-avaliacao-loja.dto';

const parseIntOpcional = new ParseIntPipe({ optional: true });

@Controller('avaliacao-loja')
export class AvaliacaoLojaController {
  constructor(private readonly avaliacaoLojaService: AvaliacaoLojaService) {}

  @Post()
  create(@Body() createAvaliacaoLojaDto: CreateAvaliacaoLojaDto) {
    return this.avaliacaoLojaService.create(createAvaliacaoLojaDto);
  }

  @Get()
  findAll(@Query('store_id', parseIntOpcional) storeId?: number) {
    return this.avaliacaoLojaService.findAll(storeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoLojaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacaoLojaDto: UpdateAvaliacaoLojaDto,
  ) {
    return this.avaliacaoLojaService.update(id, updateAvaliacaoLojaDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.avaliacaoLojaService.remove(id, userId);
  }
}