import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private prismaService: PrismaService) {}
  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = await this.prismaService.categoria.findFirst({
      where: {
        name: createCategoriaDto.name,
      },
    });

    if (categoria) {
      throw new Error('Esta categoria ja existe');
    }

    return this.prismaService.categoria.create({
      data: createCategoriaDto,
    });
  }

  findAll() {
    return this.prismaService.categoria.findMany();
  }

  async findOne(name: string) {
    const categoria = await this.prismaService.categoria.findFirst({
      where: {
        name,
      },
    });

    if (!categoria) {
      throw new Error('Categoria nao existe');
    }

    return categoria;
  }

  async remove(id: string) {
    const categoria = await this.prismaService.categoria.findFirst({
      where: {
        id,
      },
    });

    if (!categoria) {
      throw new Error('Esta categoria nao existe');
    }

    return this.prismaService.categoria.delete({
      where: {
        id,
      },
    });
  }
}
