import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ImagensProdutoService } from './imagens-produto.service';
import { CreateImagemProdutoDto, UpdateImagemProdutoDto } from './imagens-produto.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { UserPayload } from '../auth/types/UserPayload';

@Controller('imagens')
export class ImagensProdutoController {
  constructor(private readonly imagensProdutoService: ImagensProdutoService) {}

  @Post()
  create(@Body() createImagemDto: CreateImagemProdutoDto, @CurrentUser() currentUser: UserPayload) {
    return this.imagensProdutoService.create(createImagemDto, currentUser.sub);
  }

  @Public()
  @Get()
  findAll() {
    return this.imagensProdutoService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imagensProdutoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateImagemDto: UpdateImagemProdutoDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.imagensProdutoService.update(id, updateImagemDto, currentUser.sub);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: UserPayload) {
    return this.imagensProdutoService.remove(id, currentUser.sub);
  }
}
