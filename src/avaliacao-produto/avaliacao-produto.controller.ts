import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request} from '@nestjs/common';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';
import { Public } from '../auth/decorators/isPublic.decorator';

const parseIntOpcional = new ParseIntPipe({ optional: true });

@Controller('avaliacao-produto')
export class AvaliacaoProdutoController {
  constructor(
    private readonly avaliacaoProdutoService: AvaliacaoProdutoService,
  ) {}

  @Post()
  create(@Body() createAvaliacaoProdutoDto: CreateAvaliacaoProdutoDto,
  @Request() req: any,) {
    const userId = req.user.id;
    return this.avaliacaoProdutoService.create(createAvaliacaoProdutoDto, userId);
  }
  @Public()
  @Get()
  findAll(@Query('product_id', parseIntOpcional) productId?: number) {
    return this.avaliacaoProdutoService.findAll(productId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoProdutoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacaoProdutoDto: UpdateAvaliacaoProdutoDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.avaliacaoProdutoService.update(id, updateAvaliacaoProdutoDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.avaliacaoProdutoService.remove(id, userId);
  }
}