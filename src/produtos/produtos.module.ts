import { Module } from '@nestjs/common';
import { LojasModule } from '../lojas/lojas.module';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';

@Module({
  imports: [LojasModule],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [ProdutosService],
})
export class ProdutosModule {}
