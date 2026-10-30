import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';


@Controller('avaliacao-produto')
export class AvaliacaoProdutoController {
  constructor(private readonly avaliacaoProdutoService: AvaliacaoProdutoService) {}

  @Post()
  create(@Body() createAvaliacaoProdutoDto: CreateAvaliacaoProdutoDto) {
    return this.avaliacaoProdutoService.create(createAvaliacaoProdutoDto);
  }

  @Get()
  findAll() {
    return this.avaliacaoProdutoService.findAll();
  }

  @Get('id:')
  findOne(@Param('id:') id: string) {
    return this.avaliacaoProdutoService.findOne(+id);
  }

  @Get('id:')
  findAllByProduct(@Param('productId') productId: string) {
    return this.avaliacaoProdutoService.findAllByProduct(+productId);
  }


  @Patch('id:')
  update(@Param('id') id: string, @Body() updateAvaliacaoProdutoDto: UpdateAvaliacaoProdutoDto) {
    return this.avaliacaoProdutoService.update(+id, updateAvaliacaoProdutoDto);
  }
  

}