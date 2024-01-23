import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: users) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: user.id.toString(),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  isValidateToken(token: string) {
    try {
      this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      return true;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Wrong password');
    }
    return this.createToken(user);
  }

  async forgot(email: string) {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail not found');
    }

    //TODO: enviar e-mail com o token de reset de senha
    return true;
  }

  async resetPassword(password: string, token: string) {
    //TODO: verificar se o token é válido

    const id = 1;

    const user = await this.prisma.users.update({
      where: { id },
      data: { password },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
