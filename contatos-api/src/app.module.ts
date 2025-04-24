import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContatosModule } from './contatos/contatos.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [ContatosModule, PrismaModule, CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
