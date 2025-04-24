import { Injectable } from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContatosService {
  constructor(private prismaService: PrismaService) {}
  async create(createContatoDto: CreateContatoDto) {
    const { categoria, email, name, phone } = createContatoDto;
    const contato = await this.prismaService.contato.findFirst({
      where: {
        AND: [{ email: email }, { phone: phone }],
      },
    });

    if (contato) {
      throw new Error('Este phone ou email ja existe');
    }

    const categoriaExist = await this.prismaService.categoria.findFirst({
      where: {
        name: categoria,
      },
    });

    if (!categoriaExist) {
      throw new Error('Categoria nao encontrada.');
    }

    return this.prismaService.contato.create({
      data: {
        name,
        email,
        phone,
        categoria: {
          connect: { id: categoriaExist.id },
        },
      },
      include: {
        categoria: true,
      },
    });
  }

  findAll() {
    return this.prismaService.contato.findMany({
      include: {
        categoria: true,
      },
    });
  }

  async findOne(id: string) {
    const contato = await this.prismaService.contato.findFirst({
      where: {
        id,
      },
      include: {
        categoria: true,
      },
    });

    if (!contato) {
      throw new Error('Este Contato nao existe');
    }

    return contato;
  }

  async update(id: string, updateContatoDto: UpdateContatoDto) {
    const { categoria, email, name, phone } = updateContatoDto;
    const contato = await this.prismaService.contato.findFirst({
      where: {
        id,
      },
    });

    if (!contato) {
      throw new Error('Este contato nao existe');
    }

    const categoriaExist = await this.prismaService.categoria.findFirst({
      where: {
        name: categoria,
      },
    });

    if (!categoriaExist) {
      throw new Error('Este categoria nao existe');
    }

    const contatoExistPhoneAndEmail =
      await this.prismaService.contato.findFirst({
        where: {
          AND: [
            { email: updateContatoDto.email },
            { phone: updateContatoDto.phone },
          ],
        },
      });

    if (contatoExistPhoneAndEmail && contatoExistPhoneAndEmail.id !== id) {
      throw new Error('Este numero ou email ja existe');
    }

    return this.prismaService.contato.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        phone,
        categoria: {
          connect: { id: categoriaExist.id },
        },
      },
      include: {
        categoria: true,
      },
    });
  }

  async remove(id: string) {
    const contato = await this.prismaService.contato.findFirst({
      where: {
        id,
      },
    });

    if (!contato) {
      throw new Error('Este contato nao existe');
    }
    return this.prismaService.contato.delete({
      where: {
        id,
      },
    });
  }
}
