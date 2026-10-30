import { Module } from '@nestjs/common';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { AvaliacaoProdutoController } from './avaliacao-produto.controller';

@Module({
  controllers: [AvaliacaoProdutoController],
  providers: [AvaliacaoProdutoService],
})
export class AvaliacaoProdutoModule {}
