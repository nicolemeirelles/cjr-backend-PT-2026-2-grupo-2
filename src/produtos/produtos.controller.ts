import {
  BadRequestException,
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
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto, UpdateProdutoDto } from './produtos.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { UserPayload } from '../auth/types/UserPayload';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(
    @Body() createProdutoDto: CreateProdutoDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.produtosService.create(createProdutoDto, currentUser.sub);
  }

  @Public()
  @Get()
  findAll(
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
  ) {
    if (
      userId !== undefined &&
      (!Number.isInteger(userId) || userId < 1 || userId > 2_147_483_647)
    ) {
      throw new BadRequestException('userId deve ser um ID de usuário válido');
    }
    return this.produtosService.findAll(userId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.produtosService.update(id, updateProdutoDto, currentUser.sub);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.produtosService.remove(id, currentUser.sub);
  }
}
