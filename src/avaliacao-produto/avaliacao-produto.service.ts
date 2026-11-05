import {ForbiddenException, Injectable, NotFoundException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';

const INCLUDE_AUTOR = {
  user: { select: { id: true, name: true } },
} as const;

const INCLUDE_DETALHES = {
  ...INCLUDE_AUTOR,
  product: { select: { id: true, store_id: true } },
  ratingComments: {
    include: INCLUDE_AUTOR,
    orderBy: { id: 'asc' },
  },
} as const;

@Injectable()
export class AvaliacaoProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(createAvaliacaoProdutoDto: CreateAvaliacaoProdutoDto) {
    const { user_id, product_id, rating, comment } = createAvaliacaoProdutoDto;

    const produto = await this.prisma.product.findUnique({
      where: { id: product_id },
      select: { id: true },
    });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return await this.prisma.productRating.create({
      data: { user_id, product_id, rating, comment },
      include: INCLUDE_AUTOR,
    });
  }

  async findAll(productId?: number) {
    return await this.prisma.productRating.findMany({
      where: { product_id: productId },
      include: INCLUDE_AUTOR,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.productRating.findUnique({
      where: { id },
      include: INCLUDE_DETALHES,
    });

    if (!avaliacao) {
      throw new NotFoundException('Avaliação do produto não encontrada.');
    }

    return avaliacao;
  }

  async update(
    id: number,
    updateAvaliacaoProdutoDto: UpdateAvaliacaoProdutoDto,
  ) {
    const { user_id, rating, comment } = updateAvaliacaoProdutoDto;

    await this.verificarPropriedade(id, user_id);

    return await this.prisma.productRating.update({
      where: { id },
      data: { rating, comment },
      include: INCLUDE_AUTOR,
    });
  }

  async remove(id: number, userId: number) {
    await this.verificarPropriedade(id, userId);

    const [, avaliacaoRemovida] = await this.prisma.$transaction([
      this.prisma.ratingComment.deleteMany({
        where: { product_rating_id: id },
      }),
      this.prisma.productRating.delete({ where: { id } }),
    ]);

    return avaliacaoRemovida;
  }

  private async verificarPropriedade(id: number, userId: number) {
    const avaliacao = await this.prisma.productRating.findUnique({
      where: { id },
      select: { user_id: true },
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
    

    
    
  



