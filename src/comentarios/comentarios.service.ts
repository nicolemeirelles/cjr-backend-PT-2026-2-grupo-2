import {BadRequestException, ForbiddenException, Injectable, NotFoundException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';


const INCLUDE_AUTOR = {
  user: { select: { id: true, name: true } },
} as const;

@Injectable()
export class ComentariosService {
  constructor(private prisma: PrismaService) {}

  async create(createComentarioDto: CreateComentarioDto) {
    const { user_id, content, store_rating_id, product_rating_id } =
      createComentarioDto;

    
    if (store_rating_id && !product_rating_id) {
      const avaliacao = await this.prisma.storeRating.findUnique({
        where: { id: store_rating_id },
        select: { id: true },
      });
      if (!avaliacao) {
        throw new NotFoundException('Avaliação da loja não encontrada.');
      }
    } else if (product_rating_id && !store_rating_id) {
      const avaliacao = await this.prisma.productRating.findUnique({
        where: { id: product_rating_id },
        select: { id: true },
      });
      if (!avaliacao) {
        throw new NotFoundException('Avaliação do produto não encontrada.');
      }
    } else {
      throw new BadRequestException(
        'Informe store_rating_id ou product_rating_id (apenas um dos dois).',
      );
    }

    return await this.prisma.ratingComment.create({
      data: { user_id, store_rating_id, product_rating_id, content },
      include: INCLUDE_AUTOR,
    });
  }

  
  async findAll(storeRatingId?: number, productRatingId?: number) {
    return await this.prisma.ratingComment.findMany({
      where: {
        store_rating_id: storeRatingId,
        product_rating_id: productRatingId,
      },
      include: INCLUDE_AUTOR,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const comentario = await this.prisma.ratingComment.findUnique({
      where: { id },
      include: INCLUDE_AUTOR,
    });

    if (!comentario) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    return comentario;
  }

  async update(
    id: number,
    updateComentarioDto: UpdateComentarioDto,
  ) {
    const { user_id, content } = updateComentarioDto;

    await this.verificarPropriedade(id, user_id);

    return await this.prisma.ratingComment.update({
      where: { id },
      data: { content }, 
      include: INCLUDE_AUTOR,
    });
  }

  async remove(id: number, userId: number) {
    await this.verificarPropriedade(id, userId);

    return await this.prisma.ratingComment.delete({
      where: { id },
    });
  }

  private async verificarPropriedade(id: number, userId: number) {
    const comentario = await this.prisma.ratingComment.findUnique({
      where: { id },
    });

    if (!comentario) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    if (comentario.user_id !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para modificar este recurso.',
      );
    }
  }
}