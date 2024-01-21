import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ email, name, password }: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        email,
        name,
        password,
      },
      select: {
        id: true, // 👈 We only need the id back to return to the client
      },
    });
  }

  async findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { name, email, password, birth_at }: UpdatePutUserDto,
  ) {
    await this.exists(id);

    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        birth_at: birth_at ? new Date(birth_at) : null,
      },
    });
  }

  async updatePatch(
    id: number,
    { name, email, password, birth_at }: UpdatePatchUserDto,
  ) {
    await this.exists(id);

    const data: any = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = password;
    if (birth_at) data.birth_at = new Date(birth_at);

    return this.prisma.users.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
