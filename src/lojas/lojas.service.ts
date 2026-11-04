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
        products: true,
        user: { select: { id: true, name: true, username: true } },
      },
    });
    if (!loja) {
      throw new NotFoundException('Loja não encontrada');
    }
    return loja;
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
    return this.prisma.store.delete({ where: { id } });
  }

  private async checkOwner(id: number, userId: number) {
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
