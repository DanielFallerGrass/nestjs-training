import { Body, Controller, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guards';
import { User } from "../decorators/user.decorator";
import { users } from "@prisma/client";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forgot')
  async forgot(@Body() { email }: AuthForgetDTO) {
    // 👈 Destructuring observe que nesse caso eu fiz o destructuring do objeto body pegando apenas o email e não o objeto inteiro
    return this.authService.forgot(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: AuthResetDTO) {
    return this.authService.resetPassword(body.password, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User('id') user: users){
    return { data: user };
  }
}
