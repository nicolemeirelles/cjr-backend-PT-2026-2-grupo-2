import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query,} from '@nestjs/common';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';

const parseIntOpcional = new ParseIntPipe({ optional: true });

@Controller('avaliacao-produto')
export class AvaliacaoProdutoController {
  constructor(
    private readonly avaliacaoProdutoService: AvaliacaoProdutoService,
  ) {}

  @Post()
  create(@Body() createAvaliacaoProdutoDto: CreateAvaliacaoProdutoDto) {
    return this.avaliacaoProdutoService.create(createAvaliacaoProdutoDto);
  }
  
  @Get()
  findAll(@Query('product_id', parseIntOpcional) productId?: number) {
    return this.avaliacaoProdutoService.findAll(productId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoProdutoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacaoProdutoDto: UpdateAvaliacaoProdutoDto,
  ) {
    return this.avaliacaoProdutoService.update(id, updateAvaliacaoProdutoDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.avaliacaoProdutoService.remove(id, userId);
  }
}