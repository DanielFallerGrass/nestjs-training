import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

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
}
