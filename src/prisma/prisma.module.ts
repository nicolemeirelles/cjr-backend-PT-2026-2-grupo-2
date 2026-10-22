import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global: qualquer modulo pode injetar o PrismaService sem importar este modulo
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
