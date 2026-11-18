import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLojaDto, UpdateLojaDto } from './lojas.dto';

@Injectable()
export class LojasService {
  constructor(private prisma: PrismaService) {}

  async create(createLojaDto: CreateLojaDto, userId: number) {
    await this.checkCategory(createLojaDto.category_id);

    return this.prisma.store.create({
      data: { ...createLojaDto, user_id: userId },
    });
  }

  findAll() {
    return this.prisma.store.findMany({ include: { category: true } });
  }

  async findOne(id: number) {
    const loja = await this.prisma.store.findUnique({
      where: { id },
      include: {
        category: true,
        products: { include: { images: { orderBy: { order: 'asc' } } } },
        user: { select: { id: true, name: true, username: true } },
        storeRatings: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: { select: { id: true, name: true, username: true, profile_picture_url: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!loja) {
      throw new NotFoundException('Loja não encontrada');
    }

    const totalAvaliacoes = loja.storeRatings.length;
    const average_rating = totalAvaliacoes
      ? Math.round((loja.storeRatings.reduce((soma, avaliacao) => soma + avaliacao.rating, 0) / totalAvaliacoes) * 100) / 100
      : null;

    return { ...loja, average_rating };
  }

  async update(id: number, updateLojaDto: UpdateLojaDto, userId: number) {
    await this.checkOwner(id, userId);

    if (updateLojaDto.category_id) {
      await this.checkCategory(updateLojaDto.category_id);
    }

    return this.prisma.store.update({ where: { id }, data: updateLojaDto });
  }

  async remove(id: number, userId: number) {
    await this.checkOwner(id, userId);

    // Apaga tudo que depende da loja (e dos produtos dela) antes dela (o schema nao tem cascade)
    return this.prisma.$transaction(async (tx) => {
      await tx.ratingComment.deleteMany({
        where: {
          OR: [{ storeRating: { store_id: id } }, { productRating: { product: { store_id: id } } }],
        },
      });
      await tx.storeRating.deleteMany({ where: { store_id: id } });
      await tx.productRating.deleteMany({ where: { product: { store_id: id } } });
      await tx.productImage.deleteMany({ where: { product: { store_id: id } } });
      await tx.product.deleteMany({ where: { store_id: id } });
      return tx.store.delete({ where: { id } });
    });
  }

  async checkOwner(id: number, userId: number) {
    const loja = await this.prisma.store.findUnique({ where: { id } });
    if (!loja) {
      throw new NotFoundException('Loja não encontrada');
    }
    if (loja.user_id !== userId) {
      throw new ForbiddenException('Você só pode alterar sua própria loja');
    }
  }

  private async checkCategory(categoryId: number) {
    const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
  }
}
