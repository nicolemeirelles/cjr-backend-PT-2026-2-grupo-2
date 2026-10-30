import { Injectable } from '@nestjs/common';
import { CreateAvaliacaoLojaDto } from './dto/create-avaliacao-loja.dto';
import { UpdateAvaliacaoLojaDto } from './dto/update-avaliacao-loja.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AvaliacaoLojaService {
  constructor(private prisma: PrismaService){}

  async create(createAvaliacaoLojaDto: CreateAvaliacaoLojaDto) { {
  return await this.prisma.storeRating.create({ data: createAvaliacaoLojaDto });
  }
}
  async findAll(){
    return await this.prisma.storeRating.findMany({
      include: {
        user: true,
      }
    });
  }
  async update(id: number, updateAvaliacaoLojaDto: UpdateAvaliacaoLojaDto){
    return await this.prisma.storeRating.update({
      where: {id},
      data: updateAvaliacaoLojaDto
    });
  }
}
