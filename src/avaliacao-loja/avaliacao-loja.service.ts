import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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
  findAllByStore(storeId: number) {
    return this.prisma.storeRating.findMany({
        where: {store_id: storeId},
        include: {
          user: {
            select: { id: true, name: true },
          }
        }

      })
    }
    async findOne(id:number) {
          const avaliacao = await this.prisma.storeRating.findUnique({
          where: { id },
          include: {
            user: {
              select: { id: true, name: true },
            },
            store: {
              select: { id: true, store_id: true }, 
            },
            ratingComments: { 
              include: {
                user: {
                  select: { id: true, name: true },
                },
              },
              orderBy: { id: 'asc' }, 
            },
          },
        });
        if (!avaliacao) {
          throw new NotFoundException('Avaliação da loja não encontrada.');
        }
        return avaliacao;
        
      
        }
}
