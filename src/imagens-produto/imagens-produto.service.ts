import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProdutosService } from '../produtos/produtos.service';
import { CreateImagemProdutoDto, UpdateImagemProdutoDto } from './imagens-produto.dto';

@Injectable()
export class ImagensProdutoService {
  constructor(
    private prisma: PrismaService,
    private produtosService: ProdutosService,
  ) {}

  async create(createImagemDto: CreateImagemProdutoDto, userId: number) {
    await this.produtosService.checkOwner(createImagemDto.product_id, userId);
    return this.prisma.productImage.create({ data: createImagemDto });
  }

  findAll() {
    return this.prisma.productImage.findMany();
  }

  async findOne(id: number) {
    const imagem = await this.prisma.productImage.findUnique({ where: { id } });
    if (!imagem) {
      throw new NotFoundException('Imagem não encontrada');
    }
    return imagem;
  }

  async update(id: number, updateImagemDto: UpdateImagemProdutoDto, userId: number) {
    await this.checkOwner(id, userId);
    return this.prisma.productImage.update({ where: { id }, data: updateImagemDto });
  }

  async remove(id: number, userId: number) {
    await this.checkOwner(id, userId);
    return this.prisma.productImage.delete({ where: { id } });
  }

  private async checkOwner(id: number, userId: number) {
    const imagem = await this.findOne(id);
    await this.produtosService.checkOwner(imagem.product_id, userId);
  }
}
