import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LojasService } from '../lojas/lojas.service';
import { CreateProdutoDto, UpdateProdutoDto } from './produtos.dto';

@Injectable()
export class ProdutosService {
  constructor(
    private prisma: PrismaService,
    private lojasService: LojasService,
  ) {}

  async create(createProdutoDto: CreateProdutoDto, userId: number) {
    await this.lojasService.checkOwner(createProdutoDto.store_id, userId);
    await this.checkCategory(createProdutoDto.category_id);

    return this.prisma.product.create({ data: createProdutoDto });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const produto = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: 'asc' } },
        category: true,
      },
    });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto, userId: number) {
    await this.checkOwner(id, userId);

    if (updateProdutoDto.category_id) {
      await this.checkCategory(updateProdutoDto.category_id);
    }

    return this.prisma.product.update({ where: { id }, data: updateProdutoDto });
  }

  async remove(id: number, userId: number) {
    await this.checkOwner(id, userId);

    // Apaga tudo que depende do produto antes dele (o schema nao tem cascade)
    return this.prisma.$transaction(async (tx) => {
      await tx.ratingComment.deleteMany({ where: { productRating: { product_id: id } } });
      await tx.productRating.deleteMany({ where: { product_id: id } });
      await tx.productImage.deleteMany({ where: { product_id: id } });
      return tx.product.delete({ where: { id } });
    });
  }

  private async checkOwner(id: number, userId: number) {
    const produto = await this.prisma.product.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    await this.lojasService.checkOwner(produto.store_id, userId);
  }

  private async checkCategory(categoryId: number) {
    const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
  }
}
