import { Module } from '@nestjs/common';
import { ProdutosModule } from '../produtos/produtos.module';
import { ImagensProdutoService } from './imagens-produto.service';
import { ImagensProdutoController } from './imagens-produto.controller';

@Module({
  imports: [ProdutosModule],
  controllers: [ImagensProdutoController],
  providers: [ImagensProdutoService],
})
export class ImagensProdutoModule {}
