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
import { AvaliacaoLojaService } from './avaliacao-loja.service';
import { CreateAvaliacaoLojaDto } from './dto/create-avaliacao-loja.dto';
import { UpdateAvaliacaoLojaDto } from './dto/update-avaliacao-loja.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';

const parseIntOpcional = new ParseIntPipe({ optional: true });

@Controller('avaliacao-loja')
export class AvaliacaoLojaController {
  constructor(private readonly avaliacaoLojaService: AvaliacaoLojaService) {}

  @Post()
  create(
    @Body() createAvaliacaoLojaDto: CreateAvaliacaoLojaDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.avaliacaoLojaService.create(createAvaliacaoLojaDto, userId);
  }

  @Public()
  @Get()
  findAll(@Query('store_id', parseIntOpcional) storeId?: number) {
    return this.avaliacaoLojaService.findAll(storeId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoLojaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacaoLojaDto: UpdateAvaliacaoLojaDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.avaliacaoLojaService.update(id, updateAvaliacaoLojaDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.avaliacaoLojaService.remove(id, userId);
  }
}
