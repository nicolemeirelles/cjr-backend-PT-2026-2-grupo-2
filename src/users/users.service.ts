import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

const userSelect = {
  id: true,
  name: true,
  username: true,
  email: true,
  profile_picture_url: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword, ...data } = createUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas não coincidem');
    }

    await this.checkEmailAndUsername(data.email, data.username);

    const password_hash = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { ...data, password_hash },
      select: userSelect,
    });
  }

  findAll() {
    return this.prisma.user.findMany({ select: userSelect });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: userSelect });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // 404 se não existir

    const { password, confirmPassword, ...data } = updateUserDto;

    await this.checkEmailAndUsername(data.email, data.username, id);

    const updateData: Record<string, unknown> = { ...data };
    if (password) {
      if (password !== confirmPassword) {
        throw new BadRequestException('As senhas não coincidem');
      }
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({ where: { id }, data: updateData, select: userSelect });
  }

  async remove(id: number) {
    await this.findOne(id); // 404 se não existir
    return this.prisma.user.delete({ where: { id }, select: userSelect });
  }

  private async checkEmailAndUsername(email?: string, username?: string, ignoreId?: number) {
    if (!email && !username) return;

    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [email ? { email } : {}, username ? { username } : {}].filter((c) => Object.keys(c).length),
        NOT: ignoreId ? { id: ignoreId } : undefined,
      },
    });

    if (existing) {
      throw new ConflictException('E-mail ou nome de usuário já cadastrado');
    }
  }
}