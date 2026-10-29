import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './categorias.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {

  }
  async create(createCategoriaDto: CreateCategoriaDto) { {
    const categoria = await this.prisma.category.create({
      data: createCategoriaDto,
    });
    return await this.prisma.category.create({ data: createCategoriaDto });
    
  }
}
async findAll() {
    return await this.prisma.category.findMany();
  }
}
