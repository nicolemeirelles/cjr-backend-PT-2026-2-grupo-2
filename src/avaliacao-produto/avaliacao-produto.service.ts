import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AvaliacaoProdutoService {
  constructor(private prisma: PrismaService) {}
  async create(createAvaliacaoProdutoDto:CreateAvaliacaoProdutoDto) {
    {
      return await this.prisma.productRating.create ({data: createAvaliacaoProdutoDto});
    }
  }
  async findAll () {
    return await this.prisma.productRating.findMany({
      include:{
        user: true,

      }
    });
  }
 async update(
    id: number,
    updateDto: UpdateAvaliacaoProdutoDto,
    userId: number,
  ) {
    await this.verificarPropriedade(id, userId);

    return await this.prisma.productRating.update({
      where: { id },
      data: updateDto,
    });
  }
  
   findAllByProduct(productId: number) {
    return this.prisma.productRating.findMany({
        where: {product_id: productId},
        include: {
          user: {
            select: { id: true, name: true },
          }
        }

      })
    }
    async findOne(id: number) {
    const avaliacao = await this.prisma.productRating.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true },
        },
        product: {
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
      throw new NotFoundException('Avaliação do produto não encontrada.');
    }
    return avaliacao;
  }
    async remove(id: number, userId: number) {
    await this.verificarPropriedade(id, userId);

    return await this.prisma.productRating.delete({
      where: { id },
    });
  }
    private async verificarPropriedade(id: number, userId: number) {
    const avaliacao = await this.prisma.productRating.findUnique({
      where: { id },
    });
  

    if (!avaliacao) {
      throw new NotFoundException('Avaliação do produto não encontrada.');
    }

    if (avaliacao.user_id !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para modificar este recurso.',
      );
    }
  }
  }
    

    
    
  



