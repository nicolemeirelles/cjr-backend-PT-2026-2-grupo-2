import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { CreateLojaDto, UpdateLojaDto } from './lojas.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { UserPayload } from '../auth/types/UserPayload';

@Controller('lojas')
export class LojasController {
  constructor(private readonly lojasService: LojasService) {}

  @Post()
  create(@Body() createLojaDto: CreateLojaDto, @CurrentUser() currentUser: UserPayload) {
    return this.lojasService.create(createLojaDto, currentUser.sub);
  }

  @Public()
  @Get()
  findAll() {
    return this.lojasService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lojasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLojaDto: UpdateLojaDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.lojasService.update(id, updateLojaDto, currentUser.sub);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: UserPayload) {
    return this.lojasService.remove(id, currentUser.sub);
  }
}
