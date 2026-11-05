import {ForbiddenException, Injectable, NotFoundException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvaliacaoLojaDto } from './dto/create-avaliacao-loja.dto';
import { UpdateAvaliacaoLojaDto } from './dto/update-avaliacao-loja.dto';

const INCLUDE_AUTOR = {
  user: { select: { id: true, name: true } },
} as const;

const INCLUDE_DETALHES = {
  ...INCLUDE_AUTOR,
  store: { select: { id: true } },
  ratingComments: {
    include: INCLUDE_AUTOR,
    orderBy: { id: 'asc' },
  },
} as const;

@Injectable()
export class AvaliacaoLojaService {
  constructor(private prisma: PrismaService) {}

  async create(createAvaliacaoLojaDto: CreateAvaliacaoLojaDto) {
    const { user_id, store_id, rating, comment } = createAvaliacaoLojaDto;

    const loja = await this.prisma.store.findUnique({
      where: { id: store_id },
      select: { id: true },
    });
    if (!loja) {
      throw new NotFoundException('Loja não encontrada.');
    }

    return await this.prisma.storeRating.create({
      data: { user_id, store_id, rating, comment },
      include: INCLUDE_AUTOR,
    });
  }

  async findAll(storeId?: number) {
    return await this.prisma.storeRating.findMany({
      where: { store_id: storeId },
      include: INCLUDE_AUTOR,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.storeRating.findUnique({
      where: { id },
      include: INCLUDE_DETALHES,
    });

    if (!avaliacao) {
      throw new NotFoundException('Avaliação da loja não encontrada.');
    }

    return avaliacao;
  }

  async update(id: number, updateAvaliacaoLojaDto: UpdateAvaliacaoLojaDto) {
    const { user_id, rating, comment } = updateAvaliacaoLojaDto;

    await this.verificarPropriedade(id, user_id);

    return await this.prisma.storeRating.update({
      where: { id },
      data: { rating, comment },
      include: INCLUDE_AUTOR,
    });
  }

  async remove(id: number, userId: number) {
    await this.verificarPropriedade(id, userId);

    const [, avaliacaoRemovida] = await this.prisma.$transaction([
      this.prisma.ratingComment.deleteMany({
        where: { store_rating_id: id },
      }),
      this.prisma.storeRating.delete({ where: { id } }),
    ]);

    return avaliacaoRemovida;
  }

  private async verificarPropriedade(id: number, userId: number) {
    const avaliacao = await this.prisma.storeRating.findUnique({
      where: { id },
      select: { user_id: true },
    });

    if (!avaliacao) {
      throw new NotFoundException('Avaliação da loja não encontrada.');
    }

    if (avaliacao.user_id !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para modificar este recurso.',
      );
    }
  }
}